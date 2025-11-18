from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Patient, Professional, Appointment, Evolution, Alert


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email']


class ProfessionalSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    user_id = serializers.IntegerField(write_only=True, required=False)

    class Meta:
        model = Professional
        fields = ['id', 'user', 'user_id', 'role']


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'


class AppointmentSerializer(serializers.ModelSerializer):
    patient = PatientSerializer(read_only=True)
    patient_id = serializers.IntegerField(write_only=True)

    professional = ProfessionalSerializer(read_only=True)
    professional_id = serializers.IntegerField(write_only=True, required=False, allow_null=True)

    class Meta:
        model = Appointment
        fields = [
            'id', 'patient', 'patient_id',
            'professional', 'professional_id',
            'scheduled_at', 'status', 'created_at'
        ]


class EvolutionSerializer(serializers.ModelSerializer):
    appointment = AppointmentSerializer(read_only=True)
    appointment_id = serializers.IntegerField(write_only=True, required=False)

    professional = ProfessionalSerializer(read_only=True)
    professional_id = serializers.IntegerField(write_only=True, required=False)

    class Meta:
        model = Evolution
        fields = [
            'id', 'appointment', 'appointment_id',
            'professional', 'professional_id',
            'notes', 'prescription',
            'temperature', 'systolic_bp', 'diastolic_bp', 'heart_rate',
            'created_at'
        ]

    def create(self, validated_data):
        appointment_id = validated_data.pop('appointment_id', None)
        professional_id = validated_data.pop('professional_id', None)

        if appointment_id:
            validated_data['appointment'] = Appointment.objects.get(id=appointment_id)

        if professional_id:
            validated_data['professional'] = Professional.objects.get(id=professional_id)

        return super().create(validated_data)


class AlertSerializer(serializers.ModelSerializer):
    patient = PatientSerializer(read_only=True)
    evolution = EvolutionSerializer(read_only=True)

    class Meta:
        model = Alert
        fields = ['id', 'patient', 'evolution', 'created_at', 'level', 'message']
