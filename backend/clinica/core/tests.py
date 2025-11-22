from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from .models import Patient, Staff, VitalRecord, Alert

class BaseTestCase(TestCase):
    """
    Configuração base para todos os testes.
    Cria os dados necessários uma única vez por execução de classe.
    """
    def setUp(self):
        # Limpar banco (por garantia)
        Patient.objects.all().delete()
        Staff.objects.all().delete()
        User.objects.all().delete()
        Alert.objects.all().delete()

        # 1. Criar Usuário e Staff (Médico)
        self.user = User.objects.create_user(
            username='dr_house', password='password123', first_name='Gregory', last_name='House'
        )
        self.staff = Staff.objects.create(user=self.user, role='Doctor')

        # 2. Criar Usuário sem Staff (para testar erros)
        self.admin_user = User.objects.create_user(
            username='admin_sys', password='password123'
        )

        # 3. Criar Pacientes com dados distintos para testar filtros
        self.patient_low = Patient.objects.create(
            full_name='Alice Low', record_number='P001', priority='low'
        )
        self.patient_high = Patient.objects.create(
            full_name='Bob High', record_number='P002', priority='high'
        )

        # 4. Configurar Client e Token
        self.client = APIClient()
        login_resp = self.client.post('/api/auth/login/', {
            'username': 'dr_house', 'password': 'password123'
        }, format='json')
        self.token = login_resp.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')


class SecurityTests(BaseTestCase):
    """
    Testes focados em segurança e permissões.
    """
    def test_unauthenticated_access(self):
        """Deve retornar 401 se tentar acessar sem token."""
        self.client.credentials() # Remove o token
        response = self.client.get('/api/patients/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_vital_record_without_staff_profile(self):
        """
        Deve impedir (403) que um usuário logado, mas SEM perfil de Staff, crie registros médicos.
        """
        # Logar com usuário admin (que não é staff)
        self.client.force_authenticate(user=self.admin_user)
        
        payload = {
            'patient_id': self.patient_low.id,
            'temperature': 37.0
        }
        response = self.client.post('/api/vital-records/', payload, format='json')
        
        # Como definimos "raise PermissionDenied" na view, o DRF retorna 403
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class PatientFilterTests(BaseTestCase):
    """
    Testes focados na listagem, busca e filtros de pacientes.
    """
    def test_search_patient_by_name(self):
        """Deve retornar apenas o paciente buscado pelo nome."""
        # Busca por 'Alice'
        response = self.client.get('/api/patients/?search=Alice')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 1)
        self.assertEqual(response.data['results'][0]['full_name'], 'Alice Low')

    def test_filter_patient_by_priority(self):
        """Deve filtrar pacientes pela prioridade exata."""
        response = self.client.get('/api/patients/?priority=high')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 1)
        self.assertEqual(response.data['results'][0]['record_number'], 'P002')


class VitalRecordLogicTests(BaseTestCase):
    """
    Testes focados na regra de negócio: Criação de registro e Geração automática de Alertas.
    """

    def test_create_normal_record_no_alert(self):
        """
        Sinais vitais normais NÃO devem gerar alertas.
        """
        payload = {
            'patient_id': self.patient_low.id,
            'temperature': 36.5,
            'systolic_bp': 120,
            'diastolic_bp': 80,
            'heart_rate': 70,
            'notes': 'Paciente estável'
        }
        response = self.client.post('/api/vital-records/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        # Verifica se o médico foi atribuído automaticamente
        self.assertEqual(response.data['professional']['user']['username'], 'dr_house')

        # Verifica que NENHUM alerta foi criado
        self.assertEqual(Alert.objects.count(), 0)

    def test_create_fever_record_generates_alert(self):
        """
        Temperatura > 38 deve gerar alerta de Febre.
        """
        payload = {
            'patient_id': self.patient_low.id,
            'temperature': 39.5, # Febre alta
            'notes': 'Paciente febril'
        }
        response = self.client.post('/api/vital-records/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Verifica se UM alerta foi criado
        self.assertEqual(Alert.objects.count(), 1)
        alert = Alert.objects.first()
        self.assertEqual(alert.patient, self.patient_low)
        self.assertIn('Fever', alert.message)

    def test_create_hypertension_record_generates_alert(self):
        """
        Pressão alta deve gerar alerta de Hipertensão.
        """
        payload = {
            'patient_id': self.patient_low.id,
            'systolic_bp': 150, # Alto
            'diastolic_bp': 95, # Alto
        }
        self.client.post('/api/vital-records/', payload, format='json')
        
        self.assertEqual(Alert.objects.count(), 1)
        self.assertIn('Hypertension', Alert.objects.first().message)

    def test_multiple_conditions_generate_multiple_alerts(self):
        """
        Paciente com Febre E Taquicardia deve gerar 2 alertas.
        """
        payload = {
            'patient_id': self.patient_high.id,
            'temperature': 39.0,  # Febre
            'heart_rate': 130,    # Taquicardia (>120)
        }
        self.client.post('/api/vital-records/', payload, format='json')
        
        self.assertEqual(Alert.objects.count(), 2)
        messages = [a.message for a in Alert.objects.all()]
        
        # Verifica se ambas as mensagens existem
        self.assertTrue(any('Fever' in m for m in messages))
        self.assertTrue(any('Tachycardia' in m for m in messages))


class AlertViewTests(BaseTestCase):
    """
    Testes de visualização e filtro de alertas.
    """
    def setUp(self):
        super().setUp()
        # Criar manualmente alguns alertas para testar a listagem
        Alert.objects.create(patient=self.patient_low, message="Alerta 1")
        Alert.objects.create(patient=self.patient_high, message="Alerta 2")

    def test_list_alerts_pagination(self):
        """Verifica se a lista retorna os alertas paginados."""
        response = self.client.get('/api/alerts/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 2)

    def test_filter_alerts_by_patient(self):
        """Deve retornar apenas alertas de um paciente específico."""
        url = f'/api/alerts/?patient_name={self.patient_low.full_name}'
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 1)
        self.assertEqual(response.data['results'][0]['patient_name'], self.patient_low.full_name)


class AlertByPatientTests(BaseTestCase):
    """
    Testes para a rota GET /api/alerts/by-patient/?patient_id=<id>
    """
    def setUp(self):
        super().setUp()
        # Criar alertas para o paciente_low
        for i in range(5):
            Alert.objects.create(patient=self.patient_low, message=f"Alerta {i+1} - low")

        # Criar alertas para patient_high
        for i in range(3):
            Alert.objects.create(patient=self.patient_high, message=f"Alerta {i+1} - high")

    def test_get_all_alerts_for_patient(self):
        """Deve retornar todos os alertas do paciente."""
        url = f'/api/alerts/by-patient/?patient_id={self.patient_low.id}'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 5)

        for alert in response.data:
            self.assertEqual(alert['patient'], self.patient_low.id)

    def test_missing_patient_id_returns_400(self):
        response = self.client.get('/api/alerts/by-patient/')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('detail', response.data)



class ValidationTests(BaseTestCase):
    """
    Testes de validação de entrada de dados (Bad Request).
    """
    def test_create_record_invalid_patient(self):
        """Tentar criar registro para ID de paciente inexistente."""
        payload = {
            'patient_id': 9999, 
            'temperature': 37.0
        }
        response = self.client.post('/api/vital-records/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('patient_id', response.data)
