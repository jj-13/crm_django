from django.shortcuts import get_object_or_404
from django.db.models.query_utils import Q
from rest_framework import viewsets
from rest_framework import status
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from apps.blog.api.serializers.blog_serializers import PostSerializer, PostListSerializer
from apps.blog.api.pagination import SmallSetPagination, MediumSetPagination, LargeSetPagination
from apps.category.models import Category
from apps.blog.models import ViewCount
from apps.blog.permissions import IsPostAuthorOrReadOnly
from slugify import slugify


class BlogViewSets(viewsets.ModelViewSet):
    #permission_classes = (permissions.AllowAny,)
    permission_classes = (IsPostAuthorOrReadOnly, )
    serializer_class = PostSerializer
    parser_classes = [JSONParser, MultiPartParser, FormParser]
    lookup_field = 'slug'  # This tells Django to use 'slug' instead of 'pk'
    #queryset = PostSerializer.Meta.model.objects.all()


    def get_queryset(self, slug=None):

        if slug is None:
            return self.get_serializer().Meta.model.post_objects.all()
        #print(slug)
        return self.get_serializer().Meta.model.post_objects.get(slug=slug)#filter.()

    def list(self, request, *args, **kwargs):
        paginator = SmallSetPagination()
        result = paginator.paginate_queryset(self.get_queryset(), request)
        if len(result) > 0:
            post_serializer = self.get_serializer(result, many=True)
            post_serializer_paginated = paginator.get_paginated_response(post_serializer.data)

            return Response(post_serializer_paginated.data, status=status.HTTP_200_OK)
            #return paginator.get_paginated_response(post_serializer.data)
        else:
            return Response({'error': 'No post found'}, status=status.HTTP_404_NOT_FOUND)

    def retrieve(self, request, slug=None, *args, **kwargs):
        #print(pk)
        #print(self.get_object())
        if self.get_object():
            post = self.get_object()
            serializer = self.serializer_class(self.get_object())

            address = request.META.get('HTTP_X_FORWARDED_FOR')
            if address:
                ip = address.split(',')[-1].strip()
            else:
                ip = request.META.get('REMOTE_ADDR')
            #print(ip)

            if not ViewCount.objects.filter(post=post, ip_address=ip):
                view = ViewCount(post=post, ip_address=ip)
                view.save()
                post.view += 1
                #print(post.view)
                post.save()
            # item = get_object_or_404(self.queryset(), pk=pk)
            # serializer = self.serializer_class(item)
            #serializer = self.serializer_class(self.get_queryset(pk), data=request.data)
            #print(serializer.data)
            return Response({'message': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No post found'}, status=status.HTTP_404_NOT_FOUND)

    def update(self, request, *args, **kwargs):
        #user = self.request.user
        user = request.query_params.get('user')
        data = self.request.data
        slug = slugify(data['slug'])
        post = self.get_queryset(slug)
        print(post)

        if data['title']:
            if not (data['title'] == 'undefined'):
                post.title = data['title']
                post.save()

        if data['new_slug']:
            if not (data['new_slug'] == 'undefined'):
                post.slug = slugify(data['new_slug']) #slugify permite agregar - en los espacios jem: esto es el ejm: esto-es-el-ejm
                post.save()

        print(user)
        print(data)
        return Response({'success': 'Post Edited'})

"""
para buscar por pk y slug
class BlogViewSets(viewsets.ModelViewSet):
    permission_classes = (permissions.AllowAny,)
    serializer_class = PostSerializer

    def get_queryset(self):
        return self.get_serializer().Meta.model.objects.all()

    def get_object(self):
        queryset = self.get_queryset()
        filter_kwargs = {self.lookup_field: self.kwargs[self.lookup_field]}
        obj = get_object_or_404(queryset, **filter_kwargs)
        return obj

    def retrieve(self, request, *args, **kwargs):
        try:
            self.lookup_field = 'pk'
            instance = self.get_object()
        except Http404:
            self.lookup_field = 'slug'
            instance = self.get_object()
        print(instance)
        return Response({'message': 'ok'}, status=status.HTTP_200_OK)
"""


class ListPostByCategoryViewSets(viewsets.ModelViewSet):
    permission_classes = (permissions.AllowAny,)
    serializer_class = PostListSerializer

    # queryset = PostSerializer.Meta.model.objects.all()

    def get_queryset(self, pk=None):
        if pk is None:
            return self.get_serializer().Meta.model.objects.order_by('-published').all()
        return self.get_serializer().Meta.model.objects.filter(id=pk)

    def list(self, request, *args, **kwargs):
        if len(self.get_queryset()) > 0:
            category_slug = request.query_params.get('category_slug')
            category = Category.objects.get(slug=category_slug.replace("'", ""))
            # print(category)
            # print(result)

            # if category.parent:
            #     posts = self.get_queryset().filter(category=category)#agregar el paginate aqui
            #     print(posts)
            # else:
            if not Category.objects.filter(parent=category).exists():
                posts = self.get_queryset().filter(category=category)
                #print('aqui')
            else:
                sub_categories = Category.objects.filter(parent=category)
                filtered_categories = [category]
                # print('category: ', filtered_categories)
                # print('sub category: ', sub_categories)

                for catego in sub_categories:
                    filtered_categories.append(catego)

                filtered_categories = tuple(filtered_categories)
                posts = self.get_queryset().filter(category__in=filtered_categories)

            paginator = SmallSetPagination()
            result = paginator.paginate_queryset(posts, request)

            post_serializer = self.get_serializer(result, many=True)
            post_serializer_paginated = paginator.get_paginated_response(post_serializer.data)

            return Response(post_serializer_paginated.data, status=status.HTTP_200_OK)
            # return paginator.get_paginated_response(post_serializer.data)
        else:
            return Response({'error': 'No post found'}, status=status.HTTP_404_NOT_FOUND)


class SearchBlogViewSets(viewsets.ModelViewSet):
    permission_classes = (permissions.AllowAny,)
    serializer_class = PostSerializer

    # queryset = PostSerializer.Meta.model.objects.all()

    def get_queryset(self, pk=None):
        if pk is None:
            return self.get_serializer().Meta.model.post_objects.all()
        #print(pk)
        return self.get_serializer().Meta.model.post_objects.filter(pk=pk)

    def list(self, request, *args, **kwargs):
        search_term = request.query_params.get('search_term')
        matches = self.get_queryset().filter(
            Q(title__icontains=search_term) |
            Q(description__icontains=search_term) |
            Q(content__icontains=search_term) |
            Q(category__name__icontains=search_term)
        )
        #print(matches)
        paginator = SmallSetPagination()
        result = paginator.paginate_queryset(matches, request)

        post_serializer = self.get_serializer(result, many=True)
        post_serializer_paginated = paginator.get_paginated_response(post_serializer.data)

        return Response(post_serializer_paginated.data, status=status.HTTP_200_OK)


class AutorBlogViewSets(viewsets.ModelViewSet):
    permission_classes = (IsPostAuthorOrReadOnly,)
    parser_classes = [MultiPartParser, FormParser]
    serializer_class = PostSerializer
    lookup_field = 'author'  # This tells Django to use 'slug' instead of 'pk'
    #queryset = PostSerializer.Meta.model.objects.all()

    def get_queryset(self, author=None):

        if author is None:
            return self.get_serializer().Meta.model.post_objects.all()
        return self.get_serializer().Meta.model.post_objects.filter(author=author)

    def list(self, request, *args, **kwargs):
        paginator = SmallSetPagination()
        user = self.request.user
        print(user)
        queryset = self.get_queryset(user)

        if queryset.exists():
            result = paginator.paginate_queryset(queryset, request)
            post_serializer = self.get_serializer(result, many=True)
            post_serializer_paginated = paginator.get_paginated_response(post_serializer.data)

            return Response(post_serializer_paginated.data, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No post found'}, status=status.HTTP_404_NOT_FOUND)

