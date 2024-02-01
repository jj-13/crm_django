from django.urls import path
from apps.category.api.viewsets.category_views import (CategoryViewSet)


urlpatterns = [
    path('category/', CategoryViewSet.as_view(), name='category'),
]
