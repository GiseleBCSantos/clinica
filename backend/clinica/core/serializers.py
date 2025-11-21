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
    class Meta:
        model = Patient
        fields = "__all__"


class VitalRecordSerializer(serializers.ModelSerializer):
    professional = StaffSerializer(source="staff", read_only=True)
    patient_id = serializers.PrimaryKeyRelatedField(
        source='patient', queryset=Patient.objects.all(), write_only=True
    )

    class Meta:
        model = VitalRecord
        fields = [
            "id",
            "patient_id",
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

    class Meta:
        model = Alert
        fields = ["id", "patient", "message", "created_at"]
        read_only_fields = ["id", "message", "created_at"]
