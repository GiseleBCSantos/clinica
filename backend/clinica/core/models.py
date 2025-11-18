from django.db import models
from django.contrib.auth.models import User
from auditlog.registry import auditlog

PRIORITY_CHOICES = [
    ('low', 'Baixa'),
    ('medium', 'Média'),
    ('high', 'Alta'),
]

STATUS_CHOICES = [
    ('scheduled', 'Agendado'),
    ('waiting', 'Aguardando'),
    ('in_progress', 'Em atendimento'),
    ('finished', 'Finalizado'),
]


class Patient(models.Model):
    full_name = models.CharField(max_length=200)
    birth_date = models.DateField(null=True, blank=True)
    record_number = models.CharField(max_length=50, unique=True)
    main_diagnosis = models.CharField(max_length=200, blank=True)
    insurance = models.CharField(max_length=100, blank=True)
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='low')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} ({self.record_number})"


class Professional(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=100, default='Médico')

    def __str__(self):
        return self.user.get_full_name() or self.user.username


class Appointment(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='appointments')
    professional = models.ForeignKey(Professional, on_delete=models.SET_NULL, null=True, related_name='appointments')
    scheduled_at = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='scheduled')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Consulta {self.patient} - {self.scheduled_at:%Y-%m-%d %H:%M}"


class Evolution(models.Model):
    appointment = models.ForeignKey(Appointment, on_delete=models.CASCADE, related_name='evolutions', null=True, blank=True)
    professional = models.ForeignKey(Professional, on_delete=models.SET_NULL, null=True)
    notes = models.TextField(blank=True)
    prescription = models.TextField(blank=True)

    temperature = models.DecimalField(max_digits=4, decimal_places=1, null=True, blank=True)
    systolic_bp = models.IntegerField(null=True, blank=True)
    diastolic_bp = models.IntegerField(null=True, blank=True)
    heart_rate = models.IntegerField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        Alert.check_and_create_for_evolution(self)


class Alert(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='alerts')
    evolution = models.ForeignKey(Evolution, on_delete=models.SET_NULL, null=True, blank=True, related_name='alerts')
    created_at = models.DateTimeField(auto_now_add=True)
    level = models.CharField(max_length=20, default='warning')
    message = models.CharField(max_length=255)

    @staticmethod
    def check_and_create_for_evolution(evo):
        patient = evo.appointment.patient if evo.appointment else None
        if not patient:
            return

        messages = []

        if evo.temperature and float(evo.temperature) > 38.5:
            messages.append("Alerta febril: temperatura > 38.5°C")

        if evo.systolic_bp and evo.systolic_bp > 140:
            messages.append("Alerta hipertensão: PA sistólica > 140")

        if evo.heart_rate and evo.heart_rate > 120:
            messages.append("Alerta taquicardia: FC > 120 bpm")

        for msg in messages:
            Alert.objects.create(
                patient=patient,
                evolution=evo,
                level='critical' if 'taquicardia' in msg or 'hipertensão' in msg else 'warning',
                message=msg
            )


auditlog.register(Patient)
auditlog.register(Professional)
auditlog.register(Appointment)
auditlog.register(Evolution)
auditlog.register(Alert)
