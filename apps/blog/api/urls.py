from django.urls import path
from apps.blog.viewsets.blog_viewsets import BlogViewSets

urlpatterns = [
    path('blog/', BlogViewSets.as_view(), name='blog'),
    path('blog/categories/<str:category_slug>', BlogViewSets.as_view(), name='categories'),
]
