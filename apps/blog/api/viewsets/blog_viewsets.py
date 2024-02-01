from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from apps.blog.api.serializers.blog_serializers import PostSerializer, PostListSerializer
from apps.blog.api.pagination import SmallSetPagination, MediumSetPagination, LargeSetPagination

class BlogViewSets(viewsets.ModelViewSet):
    permission_classes = (permissions.AllowAny,)
    serializer_class = PostListSerializer
    #queryset = PostSerializer.Meta.model.objects.all()

    def get_queryset(self, pk=None):
        if pk is None:
            return self.get_serializer().Meta.model.objects.all()
        return self.get_serializer().Meta.model.objects.filter(id=pk)

    def list(self, request, *args, **kwargs):
        paginator = SmallSetPagination()
        result = paginator.paginate_queryset(self.get_queryset(), request)
        post_serializer = self.get_serializer(result, many=True)
        post_serializer_paginated = paginator.get_paginated_response(post_serializer.data)

        return Response(post_serializer_paginated.data, status=status.HTTP_200_OK)
        #return paginator.get_paginated_response(post_serializer.data)


