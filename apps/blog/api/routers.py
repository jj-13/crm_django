from rest_framework.routers import DefaultRouter
from apps.blog.api.viewsets.blog_viewsets import (BlogViewSets,
                                                  ListPostByCategoryViewSets,
                                                  SearchBlogViewSets,
                                                  AutorBlogViewSets,
                                                  )

router = DefaultRouter()

router.register(r'blog', BlogViewSets, basename='blog')
router.register(r'list_post_by_categories', ListPostByCategoryViewSets, basename='list_post_by_categories')
router.register(r'search_blog', SearchBlogViewSets, basename='search_blog')
router.register(r'author_list', AutorBlogViewSets, basename='author_list')

urlpatterns = router.urls
