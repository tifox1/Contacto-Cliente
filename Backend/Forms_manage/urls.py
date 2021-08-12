from django.urls import path 
from .views import login, session, formulario, ListHistory
from django.views.decorators.csrf import csrf_exempt
urlpatterns = [
    path('usuariovalidacion/', csrf_exempt(login), name='login'),
    path('session/', csrf_exempt(session)),
    path('formulario/', csrf_exempt(formulario)),
    path('historial/', ListHistory.as_view(), name="historial")
]

