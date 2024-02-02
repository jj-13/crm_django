from rest_framework.routers import DefaultRouter
from apps.blog.api.viewsets.blog_viewsets import BlogViewSets, ListPostByCategoryViewSets

router = DefaultRouter()

router.register(r'blog', BlogViewSets, basename='blog')
router.register(r'list_categories', ListPostByCategoryViewSets, basename='list_categories')

urlpatterns = router.urls
