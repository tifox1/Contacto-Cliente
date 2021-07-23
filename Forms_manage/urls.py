from django.urls import path 
from .views import login
urlpatterns = [
    path('usuariovalidacion/', login, name='login')
]