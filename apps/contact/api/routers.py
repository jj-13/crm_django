from rest_framework.routers import DefaultRouter
from apps.contact.api.viewsets.contact_viewsets import ContactView

router = DefaultRouter()

router.register(r'contact', ContactView, basename='contact')

urlpatterns = router.urls
