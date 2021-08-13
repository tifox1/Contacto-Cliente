from django.urls import path 
from .views import login, session, formulario, historial
from django.views.decorators.csrf import csrf_exempt
urlpatterns = [
    path('usuariovalidacion/', csrf_exempt(login), name='login'),
    path('session/', csrf_exempt(session)),
    path('formulario/', csrf_exempt(formulario)),
    path('historial/', historial, name="historial")
]

