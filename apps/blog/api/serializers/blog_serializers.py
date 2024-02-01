from rest_framework import serializers
from apps.blog.models import Post
from apps.category.api.serializers.category_serializers import CategorySerializer


class PostSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Post
        fields = ('__all__')
        #exclude = ('parent',)


class PostListSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Post
        exclude = ('content',)


