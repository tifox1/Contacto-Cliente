from django.db import models
from rest_framework import serializers
from .models import FormulariosModel, UsuariosModel
class FormularioSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsuariosModel
        fields = ('contact','client_type', 'stop_selling', 'order', 'seller_name', 'product_details','sample','comment','id_cliente','closed_sells', 'competition')

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsuariosModel
        fields = ('usuario', 'contrasenia')
        