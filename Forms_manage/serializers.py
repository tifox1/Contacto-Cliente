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
                  'other_competition', 'salesman_name')
        extra_kwargs = {
            'stop_selling': {
                'required': False
            },
            'seller_name': {
                'required': False
            },
            'product_details': {
                'required': False
            },
            'sample': {
                'required': False
            },            
            'comment': {
                'required': False
            },            
            'closed_sells': {
                'required': False
            },
            'competition': {
                'required': False
            },
            'other_seller': {
                'required': False
            },
            'other_competition': {
                'required': False
            },
            'salesman_name': {
                'required': False
            }
        }
# class FormularioSerializer(serializers.Serializer):
#     contact = serializers.CharField(max_length=150)
#     client_type = serializers.CharField(max_length=150)
#     stop_selling = serializers.CharField(max_length=150)
#     order = serializers.CharField(max_length=150)
#     seller_name = serializers.CharField(max_length=150)
#     product_details = serializers.CharField(max_length=150)
#     sample = serializers.CharField(max_length=150)
#     comment = serializers.CharField(max_length=150)
#     id_cliente = serializers.CharField(max_length=150)
#     closed_sells = serializers.CharField(max_length=150)
#     competition = serializers.CharField(max_length=150)
#     other_seller = serializers.CharField(max_length=150)
#     other_competition = serializers.CharField(max_length=150)
    # fields = ('contact', 'client_type', 'stop_selling', 'order', 'seller_name', 'product_details', 'sample',
    #           'comment', 'id_cliente', 'closed_sells', 'competition', 'other_seller', 'other_competition')


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsuariosModel
        fields = ('usuario', 'contrasenia')


class SessionSerializer(serializers.Serializer):
    id_usuario = serializers.IntegerField()
