from django.contrib import admin
from .models import FormulariosModel, UsuariosModel

admin.site.register(UsuariosModel)
class FormulariosAdmin(admin.ModelAdmin):
    list_display=("company", "salesman_name","id_cliente",  "contact", "client_type", "closed_sells", "stop_selling", "order", "competition", "seller_name", "product_details", "sample", "comment", "datetime_sent")
admin.site.register(FormulariosModel, FormulariosAdmin)

