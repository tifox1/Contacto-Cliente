from pprint import pprint 
from django import forms
from django import forms
from django.forms.fields import CharField
from django.shortcuts import redirect, render
from django.forms.widgets import PasswordInput
from .models import FormulariosModel
from xmlrpc import client

srv = '192.168.100.47' # Ruta del servidor
port = '8787' # Puerto servidor
db_odoo = '0130' # Nombre base de datos odoo
user = 'facturacionsegupak'
password = '12345'

# XMLRPC
common = client.ServerProxy('http://%s:%s/xmlrpc/2/common' % (srv, port))
common.version()
uid = common.authenticate(db_odoo, user, password, {})
prox = client.ServerProxy('http://%s:%s/xmlrpc/2/object' % (srv, port))



# def leer_odoo(id):
   
#     contenido_odoo = prox.execute_kw(
#         db_odoo, uid, password,
#         'res.partner',
#         'search_read', # Buscar y leer
#         [[['salesman_actual', '=',  id]]], # Condición
#         {'fields': ['name', 'id'],} # Campos que va a traer
#     )
#     return contenido_odoo



# def seleccion_odoo():
#     datos_odoo = leer_odoo()
#     seleccion_clientes = list()

#     for i in datos_odoo:
#         seleccion_clientes.append((str(i.get('id')), str(i.get('name'))))

#     return seleccion_clientes

# clientes = seleccion_odoo()

array = [ 
    ('Visita al Cliente','Visita al Cliente'),
    ('Whatsapp','Whatsapp'),
    ('Llamada','Llamada'),
    ('Correo Electronico','Correo Electronico'),
    ('Visito Segupak','Visito Segupak'),
]
array1 = [ 
    ('Habitual','Habitual'),
    ('Dejo de Comprar','Dejo de Comprar'),
    ('En gestion de compra','En gestion de compra'),
    ('Casual','Casual'),
]
array2 = [ 
    ('Precio','Precio'),
    ('Producto Faltante','Producto Faltante'),
    
]
array3 = [ 
    ('Si','Si'),
    ('No','No'),
    ('Cotizacion','Cotizacion'),
]
array4 = [ 
    ('Cintas','Cintas'),
    ('FILM','FILM'),
    ('FLEJES','FLEJES'),
    ('POF','POF'),
    ('Otro..','Otro..'),
]
array5 = [ 
    ('Cintas S.A.','Cintas S.A.'),
    ('FONDO ESTRELLA S.A.','FONDO ESTRELLA S.A.'),
    ('PARPACK S.A','PARPACK S.A.'),
    ('Otro..','Otro..'),

]
array7 = [ 
    ('Si','Si'),
    ('No','No'),
]
array9 = [
    ('Si','Si'),
    ('No','No'),
    ('Cotizacion','Cotizacion'),
]


class FormulariosForm(forms.Form):
    seleccion = forms.CharField(label='Por qué medio te contactaste?', required = True, widget = forms.RadioSelect(attrs={'name':'iCheck', 'id':'validacion1'}, choices=array))
    seleccion1 = forms.CharField(label='Tipo de Cliente', required = True, widget = forms.RadioSelect(attrs={'name':'iCheck', 'id':'validacion2'}, choices = array1))
    seleccion2 = forms.CharField(label='Por qué dejó de comprar?', required = True, widget = forms.RadioSelect(attrs = {'name':'iCheck', 'id':'validacion3'}, choices = array2))
    seleccion10 = forms.CharField(label='Cerraste alguna venta?', required= True, widget = forms.RadioSelect(attrs = {'name':'iCheck', 'id':'validacion9'}, choices = array9))
    seleccion3 = forms.CharField(label='Realizó un pedido?', required = True, widget = forms.RadioSelect(attrs = {'name':'iCheck', 'id':'validacion4'}, choices = array3))
    seleccion4 = forms.CharField(label='Compra algún producto de la competencia?', widget = forms.RadioSelect(attrs = {'name':'iCheck', 'id':'validacion5'}, choices = array4))
    seleccion5 = forms.CharField(label='De quién compra?', required = True, widget = forms.RadioSelect(attrs = {'name':'iCheck', 'id':'validacion6'},choices = array5))
    seleccion6 = forms.CharField(label='Detalle del producto', required = True, widget = forms.Textarea(attrs = {'class' : 'form-control', 'id':'validacion7', 'rows' : 3}))
    seleccion7 = forms.CharField(label='Conseguiste una muestra?', required = True, widget= forms.RadioSelect(attrs = {'name':'iCheck', 'id':'validacion8'}, choices = array7))
    seleccion8 = forms.CharField(label='Comentarios', required = True, widget = forms.Textarea(attrs = {'class' : 'form-control', 'id':'validacion9', 'rows' : 3}))

class SelectForm(forms.Form):
    # seleccion9 = forms.IntegerField(label= 'Clientes',widget= forms.SelectMultiple(choices = []))
    seleccion9 = forms.CharField(label= 'Clientes',widget= forms.Select(choices = [], attrs={'class': 'form-select form-select-lg mb-3'}))
    def __init__(self, *args, **kwargs):
        
        self.usuario = kwargs.pop('id_usuario')
        self.leer = self.leer_odoo()
        super().__init__(*args, **kwargs)
        self.fields['seleccion9'].widget.choices = self.seleccion_odoo()
        print(self.seleccion_odoo)
        # self.fields['seleccion9'].widget.choices = self.fields['seleccion9'].widget.choices.order_by('name')

    #trae los registros de la base de datos
    def leer_odoo(self):

        contenido_odoo = prox.execute_kw(
            db_odoo, uid, password,
            'res.partner',
            'search_read', # Buscar y leer
            [[['salesman_actual', '=', self.usuario], ['company_type', '=', 'company']]], # Condición
            {'fields': ['name', 'id'], 'order' : 'name'} # Campos que va a traer
        )
        return contenido_odoo

    #combierte lo que recibio de la base de datos a formato para el choice
    
    def seleccion_odoo(self):
        datos_odoo = self.leer
        seleccion_clientes = list()

        for i in datos_odoo:
            if i.get('name') != False:
                
                seleccion_clientes.append((str(i.get('name')), str(i.get('name'))))
            else:
                pass

        return seleccion_clientes

    # clientes = [
    #     ('a','A'),
    #     ('b','B'),
    #     ('c','C')
    # ]

class LoginForm(forms.Form):
    usuario = CharField(label='Usuario', widget= forms.TextInput(attrs={'class':'form-control'}))
    contrasenia = CharField(label=' Contraseña', widget = forms.PasswordInput(attrs = {'class' : 'form-control'}))



