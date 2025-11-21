from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.exceptions import PermissionDenied, ValidationError

from .models import Patient, Staff, VitalRecord, Alert
from .serializers import (
    PatientSerializer,
    StaffSerializer,
    VitalRecordSerializer,
    AlertSerializer,
    UserSerializer,
)

class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data)


class PatientViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Patient.objects.all().order_by("id")
    serializer_class = PatientSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination

    filterset_fields = ['priority', 'record_number'] 
    search_fields = ['full_name', 'record_number']   
    ordering_fields = ['full_name', 'id']            


class StaffViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Staff.objects.all().order_by("id")
    serializer_class = StaffSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination

    filterset_fields = ['role']
    search_fields = ['user__username', 'user__first_name', 'user__last_name', 'role']


class VitalRecordViewSet(viewsets.ModelViewSet):
    queryset = VitalRecord.objects.all().order_by("-id")
    serializer_class = VitalRecordSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination

    filterset_fields = ['patient', 'staff'] 
    search_fields = ['notes']               
    ordering_fields = ['created_at', 'temperature']

    def perform_create(self, serializer):
        try:
            staff = Staff.objects.get(user=self.request.user)
        except Staff.DoesNotExist:
            raise PermissionDenied("O usuário atual não possui um perfil de funcionário (Staff) vinculado.")
        
        serializer.save(staff=staff)


class AlertViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Alert.objects.all().order_by("-created_at")
    serializer_class = AlertSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination

    filterset_fields = ['patient'] 
    search_fields = ['message']    