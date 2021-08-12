from django.db import models
from rest_framework import serializers
from .models import FormulariosModel, UsuariosModel


class FormularioSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormulariosModel
        fields = ('contact', 'client_type',
                  'stop_selling', 'order',
                  'seller_name', 'product_details',
                  'sample', 'comment',
                  'id_cliente', 'closed_sells',
                  'competition', 'other_seller',
                  'other_competition', 'salesman_name',
                  'company'
                  )

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsuariosModel
        fields = ('usuario', 'contrasenia')


class SessionSerializer(serializers.Serializer):
    id_usuario = serializers.IntegerField()
