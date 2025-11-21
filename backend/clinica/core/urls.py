from django.urls import path, include
from rest_framework.routers import DefaultRouter
from core.views import (
    MeView,
    PatientViewSet,
    StaffViewSet,
    VitalRecordViewSet,
    AlertViewSet,
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'patients', PatientViewSet, basename='patient')
router.register(r'staff', StaffViewSet, basename='staff')
router.register(r'vital-records', VitalRecordViewSet, basename='vitalrecord')
router.register(r'alerts', AlertViewSet, basename='alert')

urlpatterns = [
    path('', include(router.urls)),
    path("auth/login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("auth/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("users/me/", MeView.as_view(), name="me"),
]
