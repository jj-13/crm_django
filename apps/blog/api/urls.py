from django.urls import path
from apps.blog.viewsets.blog_viewsets import BlogViewSets

urlpatterns = [
    path('blog/', BlogViewSets.as_view(), name='measure_unit'),
]