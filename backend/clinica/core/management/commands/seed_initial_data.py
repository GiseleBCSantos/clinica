import random
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from core.models import Patient, Staff, VitalRecord, Alert

PATIENT_NAMES = [
    "Alice Johnson", "Bob Smith", "Carol Williams", "David Brown", "Eva Davis",
    "Frank Miller", "Grace Wilson", "Henry Moore", "Ivy Taylor", "Jack Anderson",
    "Karen Thomas", "Leo Jackson", "Mona White", "Nathan Harris", "Olivia Martin",
    "Paul Thompson", "Quinn Garcia", "Rachel Martinez", "Steve Robinson", "Tina Clark",
    "Uma Rodriguez", "Victor Lewis", "Wendy Lee", "Xander Walker", "Yara Hall",
    "Zachary Allen", "Amy Young", "Brian King", "Cathy Wright", "Derek Scott",
    "Ella Green", "Felix Adams", "Gina Baker", "Howard Nelson", "Isabel Carter",
    "Jason Mitchell", "Kelly Perez", "Liam Roberts", "Mia Turner", "Noah Phillips",
    "Olga Campbell", "Peter Parker", "Queen Foster", "Robert Simmons", "Sophie Kelly",
    "Thomas Powell", "Ursula Long", "Victor Russell", "Wanda Price", "Ximena Butler"
]

STAFF_NAMES = [
    "Dr. John Smith", "Dr. Emily Johnson", "Nurse Mark Brown", "Nurse Lisa Davis",
    "Dr. Robert Wilson", "Nurse Sarah Moore", "Dr. William Taylor", "Nurse Jessica Anderson",
    "Dr. Michael Thomas", "Nurse Angela Jackson"
]

PRIORITIES = ['low', 'medium', 'high']

class Command(BaseCommand):
    help = "Seed 50 patients, 10 staff with users, and random vital records with alerts"

    def handle(self, *args, **kwargs):
        staff_list = []
        # Criar funcionários
        for i, full_name in enumerate(STAFF_NAMES):
            username = f'staff{i+1}'
            if not User.objects.filter(username=username).exists():
                first_name, last_name = full_name.split(' ', 1)
                user = User.objects.create_user(
                    username=username,
                    password='1234',  # senha padrão
                    first_name=first_name,
                    last_name=last_name,
                    email=f'{username}@hospital.com',
                )
                staff = Staff.objects.create(user=user, role='Doctor' if 'Dr.' in full_name else 'Nurse')
                staff_list.append(staff)
                self.stdout.write(self.style.SUCCESS(f'Created staff user {username} ({full_name})'))
            else:
                staff = Staff.objects.get(user__username=username)
                staff_list.append(staff)

        # Criar pacientes
        patient_list = []
        for i, full_name in enumerate(PATIENT_NAMES):
            record_number = f'P{i+1:03d}'
            patient, created = Patient.objects.get_or_create(
                record_number=record_number,
                defaults={
                    'full_name': full_name,
                    'priority': PRIORITIES[i % 3],
                }
            )
            patient_list.append(patient)
            if created:
                self.stdout.write(self.style.SUCCESS(f'Created patient {record_number} ({full_name})'))

        # Gerar registros vitais aleatórios para cada paciente
        for patient in patient_list:
            num_records = random.randint(1, 5)
            for _ in range(num_records):
                staff = random.choice(staff_list)
                temp = round(random.uniform(36.0, 40.0), 1)
                sys_bp = random.randint(100, 160)
                dia_bp = random.randint(60, 100)
                hr = random.randint(60, 140)
                vr = VitalRecord.objects.create(
                    patient=patient,
                    staff=staff,
                    temperature=temp,
                    systolic_bp=sys_bp,
                    diastolic_bp=dia_bp,
                    heart_rate=hr,
                    notes="Automatically generated vital record"
                )
                self.stdout.write(self.style.SUCCESS(
                    f'Created vital record for {patient.record_number}: '
                    f'T={temp}, BP={sys_bp}/{dia_bp}, HR={hr} by {staff.user.username}'
                ))

        self.stdout.write(self.style.SUCCESS('Seeding completed with vital records and alerts'))
