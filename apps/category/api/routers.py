from rest_framework.routers import DefaultRouter
from apps.category.api.viewsets.category_viewsets import CategoryViewSet

router = DefaultRouter()

router.register(r'categories', CategoryViewSet, basename='categories')

urlpatterns = router.urls
