from django.urls import path
from apps.contact.api.viewsets.contact_viewsets import OptInView

urlpatterns = [
    path('opt-in/', OptInView.as_view(), name='opt-in'),
    #path('usuario/<int:pk>/', user_detail_api_view, name='usuario_detail_api_view')
]
