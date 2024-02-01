from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from apps.category.api.serializers.category_serializers import CategorySerializer


class CategoryViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.AllowAny,)
    serializer_class = CategorySerializer
    queryset = CategorySerializer.Meta.model.objects.all()

    def get_queryset(self, pk=None):
        if pk is None:
            return self.get_serializer().Meta.model.objects.all()
        return self.get_serializer().Meta.model.objects.filter(id=pk)

    def list(self, request, *args, **kwargs):
        category_serializer = self.get_serializer(self.get_queryset(), many=True)
        categories = self.get_queryset()
        #print(categories)
        result = []
        for category in categories:
            if not category.parent:
                item = {
                    'id': category.id,
                    'name': category.name,
                    'slug': category.slug,
                    'view': category.view,
                    'sub_category': []
                }

                for sub_category in categories:
                    if sub_category.parent and sub_category.parent.id == category.id:
                        sub_item = {
                            'id': sub_category.id,
                            'name': sub_category.name,
                            'slug': sub_category.slug,
                            'view': sub_category.view
                        }
                        item['sub_category'].append(sub_item)

                result.append(item)
        #print(result)
        return Response(result, status=status.HTTP_200_OK)


