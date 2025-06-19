from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    PazienteViewSet,
    MedicoViewSet,
    SedutaViewSet,
    EsercizioViewSet,
    ContieneViewSet,
    ComunicaViewSet,
    fetch_pazienti_con_messaggi,
    cerca_pazienti,
    get_user_role,
    get_medici,
    get_info_user,
    fetch_visite,
    carica_esercizi,
    get_esercizi_per_categoria,
    recupera_info_paziente,
    recupera_info_medico,
    get_messages,
    invia_messaggio,
    register_user,
    update_user,
    delete_esercizio,
    create_esercizio,
    fetch_pazienti_associati
)

# Router DRF per i ViewSet
router = DefaultRouter()
router.register(r'pazienti', PazienteViewSet)
router.register(r'medici', MedicoViewSet)
router.register(r'sedute', SedutaViewSet)
router.register(r'esercizi', EsercizioViewSet)
router.register(r'contiene', ContieneViewSet)
router.register(r'comunica', ComunicaViewSet)

# URL patterns
urlpatterns = [
    path('', include(router.urls)),

    path('fetchPazientiConMessaggi/', fetch_pazienti_con_messaggi),
    path('cercaPazienti/', cerca_pazienti),
    path('getUserRole/', get_user_role),
    path('getMedici/', get_medici),
    path('getInfoUser/', get_info_user),
    path('fetchVisite/', fetch_visite),
    path('caricaEsercizi/', carica_esercizi),
    path('getEserciziPerCategoria/', get_esercizi_per_categoria),
    path('recuperaInfoPaziente/', recupera_info_paziente),
    path('recuperaInfoMedico/', recupera_info_medico),
    path('getMessages/', get_messages),
    path('inviaMessaggio/', invia_messaggio, name='inviaMessaggio'),
    path('registerUser/', register_user,name='registerUser'),
    path('updateUser/', update_user, name='updateUser'),
    path('deleteEsercizio/', delete_esercizio, name='deleteEsercizio'),
    path('createEsercizio/', create_esercizio, name='createEsercizio'),
    path('fetchPazientiAssociati/', fetch_pazienti_associati, name='fetchPazientiAssociati'),
]
