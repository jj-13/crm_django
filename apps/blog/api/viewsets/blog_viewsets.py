from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from apps.blog.api.serializers.blog_serializers import PostSerializer, PostListSerializer
from apps.blog.api.pagination import SmallSetPagination, MediumSetPagination, LargeSetPagination
from apps.category.models import Category
from apps.blog.models import ViewCount


class BlogViewSets(viewsets.ModelViewSet):
    permission_classes = (permissions.AllowAny,)
    serializer_class = PostSerializer
    lookup_field = 'slug'  # This tells Django to use 'slug' instead of 'pk'
    #queryset = PostSerializer.Meta.model.objects.all()

    def get_queryset(self, slug=None):

        if slug is None:
            return self.get_serializer().Meta.model.objects.all()
        print(slug)
        return self.get_serializer().Meta.model.objects.filter(slug=slug)

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
        print(self.get_object())
        if self.get_object():
            post = self.get_object()
            serializer = self.serializer_class(self.get_object())

            address = request.META.get('HTTP_X_FORWARDED_FOR')
            if address:
                ip = address.split(',')[-1].strip()
            else:
                ip = request.META.get('REMOTE_ADDR')
            print(ip)

            if not ViewCount.objects.filter(post=post, ip_address=ip):
                view = ViewCount(post=post, ip_address=ip)
                view.save()
                post.view += 1
                print(post.view)
                post.save()
            # item = get_object_or_404(self.queryset(), pk=pk)
            # serializer = self.serializer_class(item)
            #serializer = self.serializer_class(self.get_queryset(pk), data=request.data)
            #print(serializer.data)
            return Response({'message': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No post found'}, status=status.HTTP_404_NOT_FOUND)


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



