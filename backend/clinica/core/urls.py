from django.urls import path, include
from rest_framework.routers import DefaultRouter
from core.views import (
    PatientViewSet,
    ProfessionalViewSet,
    AppointmentViewSet,
    EvolutionViewSet,
    AlertViewSet,
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


router = DefaultRouter()
router.register(r'patients', PatientViewSet, basename='patient')
router.register(r'professionals', ProfessionalViewSet, basename='professional')
router.register(r'appointments', AppointmentViewSet, basename='appointment')
router.register(r'evolutions', EvolutionViewSet, basename='evolution')
router.register(r'alerts', AlertViewSet, basename='alert')

urlpatterns = [
    path('', include(router.urls)),
    path("auth/login/", TokenObtainPairView.as_view()),
    path("auth/refresh/", TokenRefreshView.as_view()),
]
