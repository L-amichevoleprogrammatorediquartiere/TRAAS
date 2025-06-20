# admin.py
from django.contrib import admin
from .models import Paziente, Medico, Seduta, Esercizio, Contiene, Comunica, Associazione


class PazienteAdmin(admin.ModelAdmin):
    list_display = ('codice_fiscale', 'nome', 'cognome', 'user')
    fields = ('codice_fiscale', 'nome', 'cognome', 'patologia_da_trattare', 'user')

class MedicoAdmin(admin.ModelAdmin):
    list_display = ('codice_fiscale', 'nome', 'cognome', 'user')
    fields = ('codice_fiscale', 'nome', 'cognome', 'specializzazione', 'user')

admin.site.register(Paziente)
admin.site.register(Medico)
admin.site.register(Seduta)
admin.site.register(Esercizio)
admin.site.register(Contiene)
admin.site.register(Comunica)
admin.site.register(Associazione)