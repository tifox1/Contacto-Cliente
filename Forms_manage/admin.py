from django.contrib import admin
from .models import FormulariosModel, UsuariosModel

admin.site.register(UsuariosModel)
class FormulariosAdmin(admin.ModelAdmin):
    list_display=("id_cliente", "seller_name", "contact", "client_type", "stop_selling", "order", "competition", "seller_name", "product_details", "datetime_sent")
admin.site.register(FormulariosModel, FormulariosAdmin)

