from django.urls import path 
from .views import login, session, formulario
urlpatterns = [
    path('usuariovalidacion/', login, name='login'),
    path('/session', session),
    path('/formulario', formulario),
]