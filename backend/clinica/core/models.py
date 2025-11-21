from django.db import models
from django.contrib.auth.models import User

class Staff(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=50)

    def __str__(self):
        return self.user.username


class Patient(models.Model):
    full_name = models.CharField(max_length=100)
    record_number = models.CharField(max_length=20, unique=True)
    priority = models.CharField(max_length=20)

    def __str__(self):
        return self.full_name


class VitalRecord(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE)
    temperature = models.FloatField(null=True, blank=True)
    systolic_bp = models.IntegerField(null=True, blank=True)
    diastolic_bp = models.IntegerField(null=True, blank=True)
    heart_rate = models.IntegerField(null=True, blank=True)
    notes = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def generate_alerts(self):
        if self.temperature and self.temperature > 38:
            Alert.objects.create(
                patient=self.patient,
                message="Fever alert: temperature > 38°C"
            )

        if (self.systolic_bp and self.systolic_bp > 140) or \
           (self.diastolic_bp and self.diastolic_bp > 90):
            Alert.objects.create(
                patient=self.patient,
                message="Hypertension alert: abnormal blood pressure"
            )

        if self.heart_rate and self.heart_rate > 120:
            Alert.objects.create(
                patient=self.patient,
                message="Tachycardia alert: heart rate > 120 bpm"
            )

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.generate_alerts()


class Alert(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    message = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
