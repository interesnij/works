from django.contrib import admin
from .models import Kanal

class KanalAdmin(admin.ModelAdmin):

    list_display = ['name', 'email', 'posted']
    list_filter = ['name']
    search_fields = ['name', 'email']
    class Meta:
            model = Kanal

admin.site.register(Kanal,KanalAdmin)
