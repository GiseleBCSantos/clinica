from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.exceptions import PermissionDenied
from django.db.models import Count
from django_filters.rest_framework import DjangoFilterBackend, FilterSet, CharFilter
from rest_framework.decorators import action
from rest_framework import status
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
    queryset = Patient.objects.annotate(alerts_count=Count('alert')).all().order_by("id")
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


class AlertFilter(FilterSet):
    patient_name = CharFilter(field_name='patient__full_name', lookup_expr='icontains')

    class Meta:
        model = Alert
        fields = ['patient_name'] 

class AlertViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Alert.objects.select_related('patient').all().order_by("-created_at")
    serializer_class = AlertSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination
    filter_backends = [DjangoFilterBackend]
    filterset_class = AlertFilter
    search_fields = ['message']

    @action(detail=False, methods=['get'], url_path='by-patient')
    def by_patient(self, request):
        patient_id = request.query_params.get("patient_id")
        if not patient_id:
            return Response({"detail": "patient_id é obrigatório."}, status=status.HTTP_400_BAD_REQUEST)

        alerts = Alert.objects.filter(patient_id=patient_id).order_by("-created_at")
        serializer = self.get_serializer(alerts, many=True)
        return Response(serializer.data)