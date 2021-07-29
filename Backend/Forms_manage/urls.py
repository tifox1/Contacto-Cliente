from django.urls import path 
from .views import login, session, formulario
from django.views.decorators.csrf import csrf_exempt
urlpatterns = [
    path('usuariovalidacion/', login, name='login'),
    path('session/', session),
    path('formulario/', csrf_exempt(formulario)),
]