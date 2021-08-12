
from datetime import datetime
from django.http import request
from django.shortcuts import redirect, render
from django.contrib import messages
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.response import Response

from rest_framework.views import APIView
from xmlrpc import client
from Forms_manage.models import FormulariosModel, UsuariosModel
from .serializers import UsuarioSerializer, FormularioSerializer, SessionSerializer

import logging

# Credenciales servidor
#   TODO: poner las variables en un archivo de configuración aparte (archivo .ini)
srv = '192.168.100.47'  # Ruta del servidor
port = '443'  # Puerto servidor
db_odoo = '0130'  # Nombre base de datos odoo
user = 'facturacionsegupak'
password = '12345'

# XMLRPC
common = client.ServerProxy('http://%s:%s/xmlrpc/2/common' % (srv, port))
common.version()
uid = common.authenticate(db_odoo, user, password, {})
prox = client.ServerProxy('http://%s:%s/xmlrpc/2/object' % (srv, port))
var_global = {'success': False}

_logger = logging.getLogger(__name__)

def conversor_fecha(dtm):
    fecha = datetime.strptime(dtm, "%a, %d %b %Y %H:%M:%S %Z")
    return fecha 

def consulta_odoo():
    resultado = prox.execute_kw(
        db_odoo, uid, password,
        'res.users',
        'search_read',  # Buscar y leer
        [[]],  # Condición
        {'fields': ['login', 'id', 'company_id'], }  # Campos que va a traer
    )
    return resultado


def leer_odoo(usuario):

    contenido_odoo = prox.execute_kw(
        db_odoo, uid, password,
        'res.partner',
        'search_read',  # Buscar y leer
        [[['salesman_actual', '=', usuario], [
            'company_type', '=', 'company']]],  # Condición
        {'fields': ['name', 'id'], 'order': 'name'}  # Campos que va a traer
    )
    return contenido_odoo

    # combierte lo que recibio de la base de datos a formato para el choice


def seleccion_odoo(usuario):
    datos_odoo = leer_odoo(usuario)
    seleccion_clientes = list()
    # diccionario_resultado = dict()
    resultado = None
    for i in datos_odoo:
        if i.get('name') != False:
            seleccion_clientes.append([str(i.get('name')), str(i.get('name'))])

        else:
            pass

    resultado = {'clientes': seleccion_clientes}
    return resultado


@api_view(['POST'])
def login(request):
    print(request.method == 'POST')
    if request.method == 'POST':
        datos = UsuarioSerializer(data=request.data)

        if datos.is_valid():
            
            usuario_query = UsuariosModel.objects.filter(
                usuario=datos.data['usuario'], contrasenia=datos.data['contrasenia'])
            # response = exception_handler()

            contenido_odoo = consulta_odoo()
            # print(contenido_odoo)
            if usuario_query.exists():

                for i in contenido_odoo:
                    
                    if str(datos.data['usuario']) == str(i.get('login')):
                        usuario = datos.data['usuario']
                        id_usuario = i.get('id')
                        company = i.get('company_id')[1]

                        return Response({'usuario': usuario, 'id_usuario': id_usuario, 'company': company})
    return Response(status=405)


@api_view(['POST'])
def formulario(request):
    my_model = FormulariosModel()
    seller = ''
    competition = ''
    if request.method == 'POST':
        datos = FormularioSerializer(data=request.data)
        print(datos.is_valid())
        if datos.is_valid():
            print(type(datos.data['client_type']))
            my_model.contact = datos.data['contact']
            my_model.client_type = datos.data['client_type']
            my_model.stop_selling = datos.data['stop_selling']
            my_model.order = datos.data['order']
            my_model.seller_name = datos.data['seller_name']
            my_model.product_details = datos.data['product_details']
            my_model.sample = datos.data['sample']
            my_model.comment = datos.data['comment']
            my_model.id_cliente = datos.data['id_cliente']
            my_model.closed_sells = datos.data['closed_sells']
            my_model.salesman_name = datos.data['salesman_name']
            my_model.company = datos.data['company']

            if datos.data['competition'] == 'other':
                my_model.competition = datos.data['other_competition']
                competition = datos.data['other_competition']

            else:
                my_model.competition = datos.data['competition']
                competition = datos.data['competition']

            if datos.data['seller_name'] == 'other':
                my_model.seller_name = datos.data['other_seller']
                seller = datos.data['other_seller']
                
            else:
                my_model.seller_name = datos.data['seller_name']
                seller = datos.data['seller_name']

            my_model.save()
            print(datos.data)

            prox.execute_kw(
                db_odoo, uid, password,  # Credenciales
                'contacto.cliente',  # Modelo odoo
                'create', [{  # Crear: [{campos del modelo a crear}]
                    'contact': datos.data['contact'],
                    'client_type': datos.data['client_type'],
                    'stop_selling': datos.data['stop_selling'],
                    'order': datos.data['order'],
                    'seller_name': seller,
                    'competition': competition,
                    'product_details': datos.data['product_details'],
                    'sample': datos.data['sample'],
                    'comment': datos.data['comment'],
                    'partner_name': datos.data['id_cliente'],
                    'cerraste_venta': datos.data['closed_sells'],
                    'salesman_name': datos.data['salesman_name'],
                    # 'partner_id': int(request.session['id']),
                    # 'fecha_hora' : pytz.utc.localize(datetime.utcnow()).astimezone(pytz.timezone('America/Asuncion'))
                    'fecha_hora': datetime.utcnow()
                }]
            )

        else:
            print(datos.errors)
    return Response()


@api_view(['POST'])
def session(request):
    resultado = None
    dato = SessionSerializer(data=request.data)
    if dato.is_valid():
        id_usuario = dato.data['id_usuario']
        leer_odoo(usuario=id_usuario)
        resultado = seleccion_odoo(id_usuario)
    return Response(resultado)

class ListHistory(APIView):
    
    def get(self, request):
        print(request.POST)
        usuario = request.POST.get('usuario')
        fecha_min = request.POST.get('fechaMin') 
        fecha_max = request.POST.get('fechaMax') 
        lista = list()
        datos_historial = FormulariosModel.objects.filter(salesman_name = 'jose',datetime_sent = (conversor_fecha(fecha_min, fecha_max)))
        for index in datos_historial:
            lista.append({
                'company': index.company,
                'salesman_name': index.salesman_name,
                'id_cliente': index.id_cliente,
                'contact': index.contact,
                'client_type': index.client_type,
                'closed_sells': index.closed_sells,
                'stop_selling': index.stop_selling,
                'order': index.order,
                'competition': index.competition,
                'seller_name': index.seller_name,
                'product_details': index.product_details,
                'sample': index.sample,
                'comment': index.comment,
            })
        print(datos_historial)
        return Response({'resultado': lista})           


# def FormulariosView(request):


#     if 'sesion_activa' in request.session:

#         my_model = FormulariosModel()

#         if request.method == 'POST':

#             datos_select = SelectForm(request.POST, id_usuario = request.session.get('id'))
#             datos = FormulariosForm(request.POST)
#             seleccion4form= Seleccion4Form(request.POST)


#             if datos.is_valid() and datos_select.is_valid() and seleccion4form.is_valid():

#                 if request.POST ['seleccion4'] == 'Otro..':
#                     my_model.comment=seleccion4form.cleaned_data.get('otros')
#                 else:
#                     my_model.comment = seleccion4form.cleaned_data.get('seleccion4')

#                 query = consulta_odoo()
#                 my_model.contact = datos.cleaned_data.get('seleccion')
#                 my_model.client_type = datos.cleaned_data.get('seleccion1')
#                 my_model.stop_selling = datos.cleaned_data.get('seleccion2')
#                 my_model.order = datos.cleaned_data.get('seleccion3')
#                 # my_model.competition = seleccion4form.cleaned_data.get('seleccion4')
#                 my_model.seller_name = datos.cleaned_data.get('seleccion5')
#                 my_model.product_details = datos.cleaned_data.get('seleccion6')
#                 my_model.sample = datos.cleaned_data.get('seleccion7')
#                 my_model.comment = datos.cleaned_data.get('seleccion8')
#                 my_model.id_cliente = datos_select.cleaned_data.get('seleccion9')
#                 my_model.closed_sells = datos.cleaned_data.get('seleccion10')
#                 my_model.login_client = request.session['username']


#                 for i in query:
#                     if i.get('id') is datos_select.cleaned_data.get('seleccion9'):
#                         my_model.login_client = i.get('login')

#                 my_model.save()

#                 messages.success(request, 'Formulario enviado')
#                 # print(datos_select.cleaned_data.get('seleccion9'))
    # prox.execute_kw(
    #     db_odoo, uid, password, # Credenciales
    #     'contacto.cliente', # Modelo odoo
    #     'create', [{ # Crear: [{campos del modelo a crear}]
    #         'contact': datos.cleaned_data.get('seleccion'),
    #         'client_type' : datos.cleaned_data.get('seleccion1'),
    #         'stop_selling': datos.cleaned_data.get('seleccion2'),
    #         'order': datos.cleaned_data.get('seleccion3'),
    #         'competition' : seleccion4form.cleaned_data.get('seleccion4'),
    #         'seller_name' : datos.cleaned_data.get('seleccion5'),
    #         'product_details' : datos.cleaned_data.get('seleccion6'),
    #         'sample' : datos.cleaned_data.get('seleccion7'),
    #         'comment' : datos.cleaned_data.get('seleccion8'),
    #         'partner_name': datos_select.cleaned_data.get('seleccion9'),
    #         'cerraste_venta' : datos.cleaned_data.get('seleccion10'),
    #         'salesman_name' : request.session['username'],
    #         # 'partner_id': int(request.session['id']),
    #         # 'fecha_hora' : pytz.utc.localize(datetime.utcnow()).astimezone(pytz.timezone('America/Asuncion'))
    #         'fecha_hora' : datetime.utcnow()
    #     }]
    # )
#                 return redirect('menu')

    #     if request.POST.get('cerrar sesion'):
    #         request.session['sesion_inactiva'] = True
    #         del request.session['sesion_activa']
    #         del request.session['username']
    #         del request.session['id']

    #         return redirect('login')

    # else:
    #     return redirect('login')

    # select_form = SelectForm(id_usuario = request.session.get('id'))
    # data = {
    #     'form' : FormulariosForm,
    #     # 'seleccion4': Seleccion4Form,
    #     'select_form' : select_form,
    #     'nombre_usuario' : request.session['username'],
    # }

    # return render(request, 'formulario/forms.html', data)


# def LoginViews(request):
#     request.session['sesion_inactiva'] = True
#     data = {
#         'form' : LoginForm
#     }
#     if 'sesion_inactiva' in request.session:

#         #verificamos el tipo de peticion
#         if request.method == 'POST':
#             datos = LoginForm(request.POST)

#             #verifica si todos los datos son validos
#             if datos.is_valid():
#                 usuario_query = UsuariosModel.objects.filter(usuario= datos.cleaned_data.get('usuario'), contrasenia=datos.cleaned_data.get('contrasenia'))

#                 #trae todos los registros en una lista con arrays
#                 contenido_odoo = consulta_odoo()
#                 if usuario_query.exists():

#                     #recorre todos los registros y valida si coinciden con los datos introducidos desde el forms, en el caso de que sea valida la condicion, se guarda en una session
#                     for i in contenido_odoo:

#                         if str(datos.cleaned_data.get('usuario')) == str(i.get('login')):
#                             request.session['username'] = i.get('login')
#                             request.session['id'] = i.get('id')
#                             request.session['sesion_activa'] = True
#                             del request.session['sesion_inactiva']
#                             # print(request.session['username'])
#                             # print(request.session['id'])

#                             return redirect('menu')

#                         else:
#                             pass
#     else:
#         redirect('menu')

#     return render(request, 'formulario/login.html', data)


# def MenuView(request):
#     global var_global
#     data = dict()

#     if 'sesion_activa' in request.session:

#         data={

#             'nombre_usuario' : request.session['username']
#         }
#         if request.POST.get('cerrar sesion'):
#             request.session['sesion_inactiva'] = True
#             del request.session['sesion_activa']
#             del request.session['username']
#             del request.session['id']

#             return redirect('login')

#         return render(request, 'formulario/menu.html', data)

#     else:
#         return redirect('login')
