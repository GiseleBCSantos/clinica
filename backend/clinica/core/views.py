from rest_framework import viewsets, permissions
from .models import Patient, Professional, Appointment, Evolution, Alert
from .serializers import (
    PatientSerializer,
    ProfessionalSerializer,
    AppointmentSerializer,
    EvolutionSerializer,
    AlertSerializer
)


class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all().order_by('-created_at')
    serializer_class = PatientSerializer
    permission_classes = [permissions.IsAuthenticated]


class ProfessionalViewSet(viewsets.ModelViewSet):
    queryset = Professional.objects.all()
    serializer_class = ProfessionalSerializer
    permission_classes = [permissions.IsAuthenticated]


class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all().order_by('-scheduled_at')
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]


class EvolutionViewSet(viewsets.ModelViewSet):
    queryset = Evolution.objects.all().order_by('-created_at')
    serializer_class = EvolutionSerializer
    permission_classes = [permissions.IsAuthenticated]


class AlertViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Alert.objects.all().order_by('-created_at')
    serializer_class = AlertSerializer
    permission_classes = [permissions.IsAuthenticated]
