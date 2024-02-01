from rest_framework.routers import DefaultRouter
from apps.blog.api.viewsets.blog_viewsets import BlogViewSets

router = DefaultRouter()

router.register(r'blog', BlogViewSets, basename='blog')

urlpatterns = router.urls
