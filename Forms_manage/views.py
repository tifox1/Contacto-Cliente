from django.contrib.auth.models import User
from datetime import datetime
from django.http import request
from django.shortcuts import redirect, render
from django.core import serializers
from django.contrib import messages
from xmlrpc import client
from Forms_manage.forms import FormulariosForm, SelectForm, LoginForm
from Forms_manage.models import FormulariosModel, UsuariosModel



# Credenciales servidor
#   TODO: poner las variables en un archivo de configuración aparte (archivo .ini)
srv = '192.168.100.47'# Ruta del servidor
port = '8787' # Puerto servidor
db_odoo = '0130' # Nombre base de datos odoo
user = 'facturacionsegupak'
password = '12345'

# XMLRPC
common = client.ServerProxy('http://%s:%s/xmlrpc/2/common' % (srv, port))
common.version()
uid = common.authenticate(db_odoo, user, password, {})
prox = client.ServerProxy('http://%s:%s/xmlrpc/2/object' % (srv, port))
var_global = {'success' : False} 

def consulta_odoo():
    resultado = prox.execute_kw(
        db_odoo, uid, password,
        'res.users',
        'search_read', # Buscar y leer
        [[]], # Condición
        {'fields': ['login','id'],} # Campos que va a traer
    )
    return resultado

def LoginViews(request):
    request.session['sesion_inactiva'] = True
    data = {
        'form' : LoginForm 
    }
    if 'sesion_inactiva' in request.session:

        #verificamos el tipo de peticion
        if request.method == 'POST':
            datos = LoginForm(request.POST)

            #verifica si todos los datos son validos
            if datos.is_valid():
                usuario_query = UsuariosModel.objects.filter(usuario= datos.cleaned_data.get('usuario'), contrasenia=datos.cleaned_data.get('contrasenia'))
                
                #trae todos los registros en una lista con arrays
                contenido_odoo = consulta_odoo()
                if usuario_query.exists():

                    #recorre todos los registros y valida si coinciden con los datos introducidos desde el forms, en el caso de que sea valida la condicion, se guarda en una session 
                    for i in contenido_odoo:   

                        if str(datos.cleaned_data.get('usuario')) == str(i.get('login')):
                            request.session['username'] = i.get('login')
                            request.session['id'] = i.get('id')
                            request.session['sesion_activa'] = True
                            del request.session['sesion_inactiva'] 
                            print(request.session['username'])
                            print(request.session['id'])

                            return redirect('menu')

                        else: 
                            pass        
    else:
        redirect('menu')

    return render(request, 'formulario/login.html', data)




def MenuView(request):
    global var_global
    data = dict()
    
    if 'sesion_activa' in request.session:

        data={
            
            'nombre_usuario' : request.session['username']
        }
        if request.POST.get('cerrar sesion'):
            request.session['sesion_inactiva'] = True
            del request.session['sesion_activa']
            del request.session['username']
            del request.session['id']

            return redirect('login')

        return render(request, 'formulario/menu.html', data)

    else:
        return redirect('login')




def FormulariosView(request):
    global var_global
    
    if 'sesion_activa' in request.session:

        my_model = FormulariosModel()
    
        if request.method == 'POST':

            datos_select = SelectForm(request.POST, id_usuario = request.session.get('id'))
            datos = FormulariosForm(request.POST)
            

            if datos.is_valid() and datos_select.is_valid():
               
                query = consulta_odoo()  
                my_model.contact = datos.cleaned_data.get('seleccion')
                my_model.client_type = datos.cleaned_data.get('seleccion1')
                my_model.stop_selling = datos.cleaned_data.get('seleccion2')
                my_model.order = datos.cleaned_data.get('seleccion3')
                my_model.competition = datos.cleaned_data.get('seleccion4')
                my_model.seller_name = datos.cleaned_data.get('seleccion5')
                my_model.product_details = datos.cleaned_data.get('seleccion6')
                my_model.sample = datos.cleaned_data.get('seleccion7')
                my_model.comment = datos.cleaned_data.get('seleccion8')
                my_model.id_cliente = datos_select.cleaned_data.get('seleccion9')
                my_model.login_client = request.session['username']
                
                
                for i in query:
                    if i.get('id') is datos_select.cleaned_data.get('seleccion9'):
                        my_model.login_client = i.get('login')

                my_model.save() 

                messages.success(request, 'Formulario enviado')
                print(datos_select.cleaned_data.get('seleccion9'))
                prox.execute_kw(
                    db_odoo, uid, password, # Credenciales
                    'contacto.cliente', # Modelo odoo
                    'create', [{ # Crear: [{campos del modelo a crear}]
                        'contact': datos.cleaned_data.get('seleccion'),
                        'client_type' : datos.cleaned_data.get('seleccion1'),
                        'stop_selling': datos.cleaned_data.get('seleccion2'),
                        'order': datos.cleaned_data.get('seleccion3'),
                        'competition' : datos.cleaned_data.get('seleccion4'),
                        'seller_name' : datos.cleaned_data.get('seleccion5'),
                        'product_details' : datos.cleaned_data.get('seleccion6'),
                        'sample' : datos.cleaned_data.get('seleccion7'),
                        'comment' : datos.cleaned_data.get('seleccion8'),
                        'partner_name': datos_select.cleaned_data.get('seleccion9'),                     
                        # 'partner_id': int(request.session['id']),
                        'fecha_hora' : datetime.now()
                    }]
                )
                return redirect('menu')  

        if request.POST.get('cerrar sesion'):
            request.session['sesion_inactiva'] = True   
            del request.session['sesion_activa']
            del request.session['username']
            del request.session['id']

            return redirect('login')

    else:
        return redirect('login')

    select_form = SelectForm(id_usuario = request.session.get('id'))
    data = {
        'form' : FormulariosForm,
        'select_form' : select_form,
        'nombre_usuario' : request.session['username']
    }

    return render(request, 'formulario/forms.html', data)









