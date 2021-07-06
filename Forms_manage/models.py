#from typing_extensions import Required
from django import forms
from django.db import models
from django.db.models import fields


class OptionsContactModel(models.Model):
    options = models.CharField('Por qué medio te contactaste?', max_length=120)

class OptionsClientTypeModel(models.Model):
    options =  models.CharField('Tipo de Cliente',  max_length=80)

class OptionsStopSellingModel(models.Model):
    options = models.TextField('Por qué dejó de comprar?')

class OptionsOrderModel(models.Model):
    options = models.CharField('Realizó un pedido?', max_length=50)

class OptionsCompetitionModel(models.Model):
    options = models.CharField('Compra algún producto de la competencia', max_length=50)

class OptionSellerNameModel(models.Model):
    options = models.CharField('De quién compra', max_length=50) 

class OptionsSampleModel(models.Model):
    options = models.CharField('Conseguiste una muestra?', max_length=50)


class FormulariosModel(models.Model):
    # def __init__(self):
    #     self.array = self.update_select()

    # def update_select(self):
    #     select_choices = list()
    #     query = SelectModel.objects.all()
    #     for set in query:
    #         select_choices.append((set.contact_select, set.contact_select))
    #     return select_choices
    id_cliente = models.TextField('Nombre del Cliente', null=True)
    login_client = models.CharField('Nombre del vendedor',null=True, max_length=120)
    # selle_name = models.CharField('Nombre del Vendedor',null=True, max_length=120)
    contact = models.CharField('Por qué medio te contactaste?', max_length=120, null= True)
    closed_sells = models.CharField('Cerraste alguna venta?', max_length=120, null= True)
    client_type = models.CharField('Tipo de Cliente', max_length=80, null= True)
    stop_selling = models.CharField('Por qué dejó de comprar?', max_length=80, null= True)
    order = models.CharField('Realizó un pedido?', max_length=50, null= True)
    competition = models.CharField('Compra algún producto de la competencia', max_length=50, null= True)
    seller_name = models.CharField('De quién compra', max_length=50, null= True)
    product_details = models.CharField('Detalle del producto', max_length=120, null= True)
    sample = models.CharField('Conseguiste una muestra?', max_length=50, null= True)
    comment = models.CharField('Comentarios', max_length=300, null= True)
    datetime_sent = models.DateTimeField(auto_now_add=True)

class UsuariosModel(models.Model):
    usuario = models.CharField('Usuario',max_length=120, null=False)
    contrasenia = models.CharField('Contraseña',max_length=120, null=False)
 





