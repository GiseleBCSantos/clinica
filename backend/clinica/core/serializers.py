from rest_framework import serializers
from .models import Patient, Staff, VitalRecord, Alert
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "first_name", "last_name")


class StaffSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Staff
        fields = "__all__"


class PatientSerializer(serializers.ModelSerializer):
    alerts_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Patient
        fields = ["id", "full_name", "record_number", "priority", "alerts_count"]


class VitalRecordSerializer(serializers.ModelSerializer):
    professional = StaffSerializer(source="staff", read_only=True)
    patient_id = serializers.PrimaryKeyRelatedField(
        source='patient', queryset=Patient.objects.all(), write_only=True
    )
    patient_name = serializers.CharField(source='patient.full_name', read_only=True)

    class Meta:
        model = VitalRecord
        fields = [
            "id",
            "patient_id",
            "patient_name",
            "professional",
            "temperature",
            "systolic_bp",
            "diastolic_bp",
            "heart_rate",
            "notes",
            "created_at",
        ]
        read_only_fields = ["id", "professional", "created_at"]


class AlertSerializer(serializers.ModelSerializer):
    message = serializers.CharField(read_only=True)
    patient_name = serializers.CharField(source='patient.full_name', read_only=True)

    class Meta:
        model = Alert
        fields = ["id", "patient","patient_name", "message", "created_at"]
        read_only_fields = ["id", "message", "patient_name", "created_at"]
