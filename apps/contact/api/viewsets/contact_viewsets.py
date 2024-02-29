from django.conf import settings
from django.core.mail import send_mail
from rest_framework import status, permissions, viewsets
from rest_framework.response import Response
from apps.contact.api.serializers.contact_serializers import ContactSerializer
import requests


class ContactView(viewsets.GenericViewSet):
    permission_classes = (permissions.AllowAny,)
    serializer_class = ContactSerializer
    queryset = ContactSerializer.Meta.model.objects.all()

    def list(self, request):
        users = self.get_queryset()
        user_serializer = self.serializer_class(users, many=True)
        return Response(user_serializer.data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        #print(request.data['subject'])
        contact_serializer = self.serializer_class(data=request.data)
        if contact_serializer.is_valid():
            contact_serializer.save()

            try:
                send_mail(
                    request.data['subject'],
                    'New Client Request: '
                    + '\n\nName: ' + request.data['name']
                    + '\nEmail: ' + request.data['email']
                    + '\n\nMessage:\n' + request.data['message']
                    + '\nPhone: ' + request.data['phone']
                    + '\n\nBudget: ' + request.data['budget'],
                    'jonnathanrp13@gmail.com',
                    ['jj.rosero@hotmail.com'],
                    fail_silently=False
                )
                return Response({'success': 'Message sent successfully'}, status=status.HTTP_201_CREATED)
            except:
                return Response({'error': 'Message not sent'})
            finally:
                print()

        return Response({
            'message': 'Error al registrar',
            'errors': contact_serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


