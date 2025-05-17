from django.contrib import admin
from .models import Sites

class SitesAdmin(admin.ModelAdmin):

    list_display = ['name', 'content', 'posted'] #все поля field.name in Blog._meta.fields
    #fields = []
    #exclude = []
    list_filter = ['name']
    search_fields = ['name']
    class Meta:
            model = Sites

admin.site.register(Sites,SitesAdmin)
