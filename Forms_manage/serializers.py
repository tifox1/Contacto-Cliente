from django.db import models
from rest_framework import serializers
from .models import FormulariosModel, UsuariosModel
class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsuariosModel
        fields = ('__all__')