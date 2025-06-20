from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from datetime import timedelta
from django.utils import timezone

from .models import Paziente, Medico, Seduta, Esercizio, Contiene, Comunica, Associazione, User
from .serializers import (
    PazienteSerializer,
    MedicoSerializer,
    SedutaSerializer,
    EsercizioSerializer,
    ContieneSerializer,
    ComunicaSerializer,
    AssociazioneSerializer
)


class PazienteViewSet(viewsets.ModelViewSet):
    queryset = Paziente.objects.all()
    serializer_class = PazienteSerializer

class MedicoViewSet(viewsets.ModelViewSet):
    queryset = Medico.objects.all()
    serializer_class = MedicoSerializer

class SedutaViewSet(viewsets.ModelViewSet):
    queryset = Seduta.objects.all()
    serializer_class = SedutaSerializer

class EsercizioViewSet(viewsets.ModelViewSet):
    queryset = Esercizio.objects.all()
    serializer_class = EsercizioSerializer

    def get_queryset(self):
        queryset = Esercizio.objects.all()
        nome = self.request.query_params.get('nome')
        if nome:
            queryset = queryset.filter(nome__iexact=nome)
        return queryset

class ContieneViewSet(viewsets.ModelViewSet):
    queryset = Contiene.objects.all()
    serializer_class = ContieneSerializer

@permission_classes([IsAuthenticated])
class ComunicaViewSet(viewsets.ModelViewSet):
    queryset = Comunica.objects.all()
    serializer_class = ComunicaSerializer

class AssociazioneViewSet(viewsets.ModelViewSet):
    queryset = Associazione.objects.all()
    serializer_class = AssociazioneSerializer


# 1. fetchPazientiConMessaggi
#codicefiscale del dottore ritorna clienti con messaggi da leggere -> formato codicefiscale, patologia
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def fetch_pazienti_con_messaggi(request):
    #ci ho messo le mani works?
    user = request.user
    try:
        medico = Medico.objects.get(user=user)
        messaggi = Comunica.objects.filter(
        medico=medico,
        mittente='paziente',
        letto=False
        )
        # Ottieni pazienti unici che hanno scritto messaggi non letti
        pazienti = Paziente.objects.filter(comunica__in=messaggi).distinct()

        data = [
            {
                'codiceFiscale': p.codice_fiscale,
                'patologia': p.patologia_da_trattare
            }
            for p in pazienti
        ]

        return Response(data)
    except Paziente.DoesNotExist:
        return Response({'error': 'Utente non è un paziente'}, status=403)
    # Solo messaggi NON letti inviati da pazienti a quel medico
    


# 2. CercaPazienti
#passiamo una stringa e cercheremo dentro: nome, cognome, CF o patologia -> pazienti formato codicefiscale, patologia
@api_view(['GET'])
def cerca_pazienti(request):
    query = request.query_params.get('query', '')
    pazienti = Paziente.objects.filter(Q(codice_fiscale__icontains=query) | Q(patologia_da_trattare__icontains=query) |
                                       Q(nome__icontains= query) | Q(cognome__icontains=query))
    data = [
        {
            'codiceFiscale': p.codice_fiscale,
            'patologia': p.patologia_da_trattare
        }
        for p in pazienti
    ]

    return Response(data)

# 3. GetUserRole
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_role(request):
    user = request.user

    # Verifica se l'utente è un paziente
    if Paziente.objects.filter(user=user).exists():
        return Response({'role': 'paziente'})

    # Verifica se l'utente è un medico
    if Medico.objects.filter(user=user).exists():
        return Response({'role': 'medico'})

    return Response({'role': 'unknown'})

# 4. GetMedici
#passiamo il token access e ci deve ritornare i medici nel seguente formato -> Nome, cognome, professione, immagine, codicefiscale
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_medici(request):
    user = request.user

    try:
        paziente = Paziente.objects.get(user=user)
    except Paziente.DoesNotExist:
        return Response({'error': 'Utente non è un paziente'}, status=403)

    # Trova i medici associati a questo paziente
    associazioni = Associazione.objects.filter(paziente=paziente).select_related('medico')
    medici = [a.medico for a in associazioni]

    data = [{
        'nome': m.nome,
        'cognome': m.cognome,
        'specializzazione': m.specializzazione,
        'immagine': m.immagine.url if m.immagine else None,
        'codiceFiscale': m.codice_fiscale
    } for m in medici]

    return Response(data)


# 5. getInfoUser
#ricorda che se è medico dentro patologia devi ritornare ''
#passiamo il token access e ci ritorna -> nome, cognome, dataNascita, genere, numero di telefono, email, patologia, immagine, codicefiscale
        #cognome: 'Rossi',
        #dataNascita: '1980-05-15',
        #genere: 'Maschile',
        #numeroTelefono: '+39 123 456 7890',
        #email: 'mario.rossi@example.com',
        #patologia: 'Ipertensione',
        #immagine: 'https://via.placeholder.com/300', // immagine di esempio
        #codiceFiscale: 'CRSGNN03TigerCs'

@api_view(['GET'])
@permission_classes([IsAuthenticated])
#non ha bisogno di commenti è pretty easy, diamo il token access e ci ritorna le info di quell'utente
def get_info_user(request):
    user = request.user

    # Se è un paziente
    try:
        paziente = Paziente.objects.get(user=user)
        return Response({
            'nome': paziente.nome,
            'cognome': paziente.cognome,
            'dataNascita': paziente.data_di_nascita,
            'genere': paziente.genere,
            'numeroTelefono': paziente.telefono,
            'email': paziente.email,
            'patologia': paziente.patologia_da_trattare,
            'immagine': paziente.immagine.url if paziente.immagine else None,
            'codiceFiscale': paziente.codice_fiscale
        })
    except Paziente.DoesNotExist:
        pass

    # Se è un medico
    try:
        medico = Medico.objects.get(user=user)
        return Response({
            'nome': medico.nome,
            'cognome': medico.cognome,
            'dataNascita': medico.data_di_nascita,
            'genere': medico.genere,
            'numeroTelefono': medico.telefono,
            'email': medico.email,
            'patologia': '',
            'immagine': medico.immagine.url if medico.immagine else None,
            'codiceFiscale': medico.codice_fiscale
        })
    except Medico.DoesNotExist:
        pass

    return Response({'error': 'Utente non trovato come paziente o medico.'}, status=status.HTTP_404_NOT_FOUND)

# 6. FetchVisite
#step one, controlliamo se il token è del medico e dopo vedremo di tornare tutte le visite associate ad esso
#formato seduta title, start ed end
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def fetch_visite(request):
    user = request.user
    try:
        medico = Medico.objects.get(user=user)
        visite = Seduta.objects.filter(medico=medico.codice_fiscale)
        data = [{
            'title': v.codice,
            'start': v.data,
            'end': v.data + timedelta(hours=2)
        } for v in visite]
        return Response(data)
    except Medico.DoesNotExist:
        return Response({'error': 'Utente non trovato come medico.'}, status=status.HTTP_404_NOT_FOUND)

# 7. caricaEsercizi
@api_view(['GET'])
def carica_esercizi(request):
    esercizi = Esercizio.objects.all()
    data = [{'nome': e.nome, 'categoria': e.categoria} for e in esercizi]
    return Response(data)

# 8. getEserciziPerCategoria
@api_view(['GET'])
def get_esercizi_per_categoria(request):
    categoria = request.query_params.get('categoria')

    if not categoria:
        return Response({'error': 'Parametro "categoria" mancante.'}, status=400)

    esercizi = Esercizio.objects.filter(categoria=categoria)
    
    if not esercizi.exists():
        return Response({'message': f'Nessun esercizio trovato per la categoria: {categoria}'}, status=404)

    serializer = EsercizioSerializer(esercizi, many=True)
    return Response(serializer.data)

# 9. RecuperaInfoPaziente
@api_view(['GET'])
def recupera_info_paziente(request):
    codice_fiscale = request.query_params.get('codiceFiscale')
    
    if not codice_fiscale:
        return Response({'error': 'Parametro "codice fiscale" mancante.'}, status=400)
    
    try:
        paziente = Paziente.objects.get(codice_fiscale=codice_fiscale)
    except Paziente.DoesNotExist:
        return Response({'message': f'Nessun paziente trovato per il codice: {codice_fiscale}'}, status=404)

    serializer = PazienteSerializer(paziente)
    return Response(serializer.data)


# 10. RecuperaInfoMedico
@api_view(['GET'])
def recupera_info_medico(request):
    codice_fiscale = request.query_params.get('codiceFiscale')
    
    if not codice_fiscale:
        return Response({'error': 'Parametro "codice fiscale" mancante.'}, status=400)
    
    try:
        medico = Medico.objects.get(codice_fiscale=codice_fiscale)
    except Medico.DoesNotExist:
        return Response({'message': f'Nessun medico trovato per il codice: {codice_fiscale}'}, status=404)

    serializer = MedicoSerializer(medico)
    return Response(serializer.data)


# 11. getMessages   il codice fiscale è dell'utente destinatario dobbiamo vedere se si può trovare il codice fiscale del mittente invece da qua
#formato messaggi: id: (dal messaggio più vecchio al più nuovo quindi in ordine crescente), text:,
# sender:(può essere o "other" o "me" questo viene in base all'username) ed infine timestamp: "2025-05-25T16:50:00Z"
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_messages(request):
    user = request.user
    codice_fiscale_dest = request.query_params.get('codiceFiscale')

    # Scopri se chi ha fatto la richiesta è medico o paziente
    mittente_medico = Medico.objects.filter(user=user).first()
    mittente_paziente = Paziente.objects.filter(user=user).first()

    if mittente_medico:
        codice_fiscale_mittente = mittente_medico.codice_fiscale
        medico_cf = codice_fiscale_mittente
        paziente_cf = codice_fiscale_dest
        mittente_tipo = 'medico'
    elif mittente_paziente:
        codice_fiscale_mittente = mittente_paziente.codice_fiscale
        medico_cf = codice_fiscale_dest
        paziente_cf = codice_fiscale_mittente
        mittente_tipo = 'paziente'
    else:
        return Response({'error': 'Utente non riconosciuto come medico o paziente'}, status=400)

    # Trova i messaggi tra i due utenti
    messaggi = Comunica.objects.filter(
        medico__codice_fiscale=medico_cf,
        paziente__codice_fiscale=paziente_cf
    ).order_by('data')

    # Costruzione del JSON di risposta
    data = []
    for idx, msg in enumerate(messaggi, start=1):
        if (mittente_tipo == 'medico' and msg.mittente.lower() == 'medico') or \
           (mittente_tipo == 'paziente' and msg.mittente.lower() == 'paziente'):
            sender = 'me'
        else:
            sender = 'other'

        #se i messaggi dentro messaggi hanno come sender == other e letto == false devo mettere letto=true
        #per il momento questa parte non verrà scritta.....

        data.append({
            'id': idx,
            'text': msg.contenuto,
            'sender': sender,
            'timestamp': msg.data
        })

    return Response(data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def invia_messaggio(request):
    user = request.user
    codice_fiscale_destinatario = request.data.get('codiceFiscale')
    contenuto = request.data.get('contenuto')

    if not codice_fiscale_destinatario or not contenuto:
        return Response({'error': 'codiceFiscale o contenuto mancante'}, status=status.HTTP_400_BAD_REQUEST)

    # Tenta di capire se chi scrive è un medico
    if Medico.objects.filter(user=user).exists():
        medico = Medico.objects.get(user=user)
        try:
            paziente = Paziente.objects.get(codice_fiscale=codice_fiscale_destinatario)
        except Paziente.DoesNotExist:
            return Response({'error': 'Paziente non trovato'}, status=status.HTTP_404_NOT_FOUND)

        mittente = 'medico'

    # Altrimenti è un paziente
    elif Paziente.objects.filter(user=user).exists():
        paziente = Paziente.objects.get(user=user)
        try:
            medico = Medico.objects.get(codice_fiscale=codice_fiscale_destinatario)
        except Medico.DoesNotExist:
            return Response({'error': 'Medico non trovato'}, status=status.HTTP_404_NOT_FOUND)

        mittente = 'paziente'

    else:
        return Response({'error': 'Utente non valido'}, status=status.HTTP_403_FORBIDDEN)

    # Crea il messaggio
    Comunica.objects.create(
        medico=medico,
        paziente=paziente,
        data=timezone.now(),
        contenuto=contenuto,
        mittente=mittente,
        letto=False
    )

    return Response({'success': 'Messaggio inviato correttamente'}, status=status.HTTP_201_CREATED)


#per registrare un utente (medico o paziente)
@api_view(['POST'])
def register_user(request):
    data = request.data

    codice_fiscale = data.get('codice_fiscale')
    nome = data.get('nome')
    cognome = data.get('cognome')
    data_di_nascita = data.get('data_di_nascita')
    genere = data.get('genere')
    telefono = data.get('telefono')
    email = data.get('email')
    immagine = data.get('immagine')  # solo se usi multipart/form-data
    password = data.get('password')
    ruolo = data.get('ruolo')  # "paziente" o "medico"

    if not all([codice_fiscale, nome, cognome, data_di_nascita, genere, telefono, email, password, ruolo]):
        return Response({'error': 'Dati mancanti'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=codice_fiscale).exists():
        return Response({'error': 'Utente già esistente'}, status=status.HTTP_400_BAD_REQUEST)

    # Crea l'utente Django
    user = User.objects.create_user(username=codice_fiscale, password=password)
    
    # Crea il paziente o medico
    if ruolo == "Paziente":
        Paziente.objects.create(
            codice_fiscale=codice_fiscale,
            nome=nome,
            cognome=cognome,
            data_di_nascita=data_di_nascita,
            genere=genere,
            telefono=telefono,
            email=email,
            immagine=immagine,
            patologia_da_trattare='',
            user=user
        )
    elif ruolo == "Medico":
        specializzazione = data.get('specializzazione')
        Medico.objects.create(
            codice_fiscale=codice_fiscale,
            nome=nome,
            cognome=cognome,
            data_di_nascita=data_di_nascita,
            genere=genere,
            telefono=telefono,
            email=email,
            immagine=immagine,
            specializzazione=specializzazione,
            user=user
        )
    else:
        user.delete()
        return Response({'error': 'Ruolo non valido'}, status=status.HTTP_400_BAD_REQUEST)

    return Response({'success': 'Utente registrato con successo'}, status=status.HTTP_201_CREATED)



@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user(request):
    user = request.user  # Utente autenticato

    # Identifica se è un Paziente o Medico
    persona = None
    if hasattr(user, 'paziente'):
        persona = user.paziente
    elif hasattr(user, 'medico'):
        persona = user.medico
    else:
        return Response({'error': 'Ruolo non riconosciuto'}, status=status.HTTP_400_BAD_REQUEST)

    data = request.data

    # Aggiorna solo i campi presenti e non vuoti
    nome = data.get('nome')
    if nome: persona.nome = nome

    cognome = data.get('cognome')
    if cognome: persona.cognome = cognome

    data_di_nascita = data.get('dataNascita')  # Chiave come dal frontend
    if data_di_nascita: persona.data_di_nascita = data_di_nascita

    genere = data.get('genere')
    if genere: persona.genere = genere

    telefono = data.get('numeroTelefono')
    if telefono: persona.telefono = telefono

    email = data.get('email')
    if email: persona.email = email

    immagine = data.get('immagine')
    if immagine: persona.immagine = immagine

    persona.save()

    return Response({'success': 'Profilo aggiornato con successo'}, status=status.HTTP_200_OK)



@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_esercizio(request):
    nome = request.data.get('nome')  # o puoi usare request.query_params.get() se invii via URL

    if not nome:
        return Response({'error': 'Nome esercizio mancante'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        esercizio = Esercizio.objects.get(nome=nome)
    except Esercizio.DoesNotExist:
        return Response({'error': 'Esercizio non trovato'}, status=status.HTTP_404_NOT_FOUND)

    esercizio.delete()
    return Response({'success': 'Esercizio eliminato con successo'}, status=status.HTTP_200_OK)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_esercizio(request):
    nome = request.data.get('nome')
    categoria = request.data.get('categoria')
    video = request.data.get('video')
    descrizione = request.data.get('descrizione')

    if not nome or not categoria:
        return Response({'error': 'Nome e categoria sono obbligatori'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        esercizio = Esercizio.objects.create(
            nome=nome,
            categoria=categoria,
            video=video,
            descrizione=descrizione
        )
        return Response({'success': 'Esercizio creato con successo'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'error': f'Esercizio non creato: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
    


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def fetch_pazienti_associati(request):
    user = request.user
    try:
        medico = Medico.objects.get(user=user)
        pazienti = Paziente.objects.filter(associazione__medico=medico).distinct()

        data = [
            {
                'codiceFiscale': p.codice_fiscale,
                'patologia': p.patologia_da_trattare
            }
            for p in pazienti
        ]

        return Response(data)
    except Medico.DoesNotExist:
        return Response({'error': 'Utente non è un medico'}, status=403)