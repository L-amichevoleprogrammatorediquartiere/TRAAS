import os
import django
from datetime import date

# Imposta il modulo settings del tuo progetto
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Paziente, Medico, Seduta, Contiene, Comunica, Esercizio

# Funzione principale
def popola_database():
    # 1. Pazienti
    pazienti_data = [
        {"codice_fiscale": "RSSMRA90A01H501Z", "nome": "Mario", "cognome": "Rossi", "data_di_nascita": "1990-01-01", "genere": "M", "telefono": "3331234567", "email": "mario.rossi@example.com", "patologia_da_trattare": "Riabilitazione spalla"},
        {"codice_fiscale": "BNCLRA92C41F205X", "nome": "Laura", "cognome": "Bianchi", "data_di_nascita": "1992-03-01", "genere": "F", "telefono": "3331234568", "email": "laura.bianchi@example.com", "patologia_da_trattare": "Lesione crociato"},
        {"codice_fiscale": "VRDLGU88D22F839H", "nome": "Luca", "cognome": "Verdi", "data_di_nascita": "1988-04-22", "genere": "M", "telefono": "3331234569", "email": "luca.verdi@example.com", "patologia_da_trattare": "Frattura femore"},
        {"codice_fiscale": "NRSLNZ95E12H501Y", "nome": "Elena", "cognome": "Neri", "data_di_nascita": "1995-05-12", "genere": "F", "telefono": "3331234570", "email": "elena.neri@example.com", "patologia_da_trattare": "Riabilitazione ginocchio"},
        {"codice_fiscale": "FRNGPP93F03H501R", "nome": "Giuseppe", "cognome": "Ferrari", "data_di_nascita": "1993-06-03", "genere": "M", "telefono": "3331234571", "email": "giuseppe.ferrari@example.com", "patologia_da_trattare": "Scoliosi"},
        {"codice_fiscale": "MGNLRA96G14H501T", "nome": "Lara", "cognome": "Mangano", "data_di_nascita": "1996-07-14", "genere": "F", "telefono": "3331234572", "email": "lara.mangano@example.com", "patologia_da_trattare": "Lombalgia cronica"},
        {"codice_fiscale": "BLRDNL91H25H501A", "nome": "Daniele", "cognome": "Baldoni", "data_di_nascita": "1991-08-25", "genere": "M", "telefono": "3331234573", "email": "daniele.baldoni@example.com", "patologia_da_trattare": "Instabilità spalla"},
        {"codice_fiscale": "RZZCLD97I30H501V", "nome": "Claudia", "cognome": "Rizzo", "data_di_nascita": "1997-09-30", "genere": "F", "telefono": "3331234574", "email": "claudia.rizzo@example.com", "patologia_da_trattare": "Ernia del disco"},
        {"codice_fiscale": "MNFTMS85L11H501U", "nome": "Tommaso", "cognome": "Manfredi", "data_di_nascita": "1985-12-11", "genere": "M", "telefono": "3331234575", "email": "tommaso.manfredi@example.com", "patologia_da_trattare": "Post ictus"},
        {"codice_fiscale": "FLCGRN89M20H501P", "nome": "Gianna", "cognome": "Falco", "data_di_nascita": "1989-11-20", "genere": "F", "telefono": "3331234576", "email": "gianna.falco@example.com", "patologia_da_trattare": "Artrite reumatoide"},
    ]

    pazienti = [Paziente.objects.create(**p) for p in pazienti_data]

    # 2. Medici
    medici_data = [
        {"codice_fiscale": "DRSSLC70A01H501T", "nome": "Luca", "cognome": "Drossi", "data_di_nascita": "1970-01-01", "genere": "M", "telefono": "3201111111", "email": "luca.drossi@medici.it", "specializzazione": "Fisiatria"},
        {"codice_fiscale": "MLLBRT75B02H501D", "nome": "Roberta", "cognome": "Melli", "data_di_nascita": "1975-02-02", "genere": "F", "telefono": "3201111112", "email": "roberta.melli@medici.it", "specializzazione": "Ortopedia"},
        {"codice_fiscale": "NTNGPP72C03H501S", "nome": "Giuseppe", "cognome": "Natini", "data_di_nascita": "1972-03-03", "genere": "M", "telefono": "3201111113", "email": "giuseppe.natini@medici.it", "specializzazione": "Neurologia"},
        {"codice_fiscale": "RMNSFR80D04H501X", "nome": "Sara", "cognome": "Romani", "data_di_nascita": "1980-04-04", "genere": "F", "telefono": "3201111114", "email": "sara.romani@medici.it", "specializzazione": "Reumatologia"},
        {"codice_fiscale": "TRNCST78E05H501V", "nome": "Cristiano", "cognome": "Terni", "data_di_nascita": "1978-05-05", "genere": "M", "telefono": "3201111115", "email": "cristiano.terni@medici.it", "specializzazione": "Fisiatria"},
        {"codice_fiscale": "BZNNNA82F06H501U", "nome": "Anna", "cognome": "Bizzoni", "data_di_nascita": "1982-06-06", "genere": "F", "telefono": "3201111116", "email": "anna.bizzoni@medici.it", "specializzazione": "Ortopedia"},
        {"codice_fiscale": "GNCLUC74G07H501Y", "nome": "Luciano", "cognome": "Genchi", "data_di_nascita": "1974-07-07", "genere": "M", "telefono": "3201111117", "email": "luciano.genchi@medici.it", "specializzazione": "Neurochirurgia"},
        {"codice_fiscale": "MTTRLL77H08H501L", "nome": "Raffaella", "cognome": "Matturi", "data_di_nascita": "1977-08-08", "genere": "F", "telefono": "3201111118", "email": "raffaella.matturi@medici.it", "specializzazione": "Fisiatria"},
        {"codice_fiscale": "DLGFRN69I09H501O", "nome": "Ferdinando", "cognome": "De Luigi", "data_di_nascita": "1969-09-09", "genere": "M", "telefono": "3201111119", "email": "ferdinando.deluigi@medici.it", "specializzazione": "Ortopedia"},
        {"codice_fiscale": "CVLCLR73L10H501Z", "nome": "Clara", "cognome": "Cavalli", "data_di_nascita": "1973-10-10", "genere": "F", "telefono": "3201111120", "email": "clara.cavalli@medici.it", "specializzazione": "Fisiatria"},
    ]

    medici = [Medico.objects.create(**m) for m in medici_data]

    # 3. Sedute
    for i in range(10):
        Seduta.objects.create(
            codice=f"SDT000{i+1}",
            paziente=pazienti[i],
            medico=medici[i],
            data=date(2024, 6, i+1),
            video=f"video{i+1}.mp4",
            evaluate_rt="Valutazione RT",
            evaluate_pt="Valutazione PT",
            tipo="sincrono" if i % 2 == 0 else "asincrono"
        )

    # 4. Contiene (serve che esistano esercizi con questi nomi)
    esercizi_nomi = ["Sollevamento gamba tesa", "Sollevamento del braccio con bastone",
                      "Rotazioni del tronco da seduto", "Rotazioni del collo", 
                      "Rotazione esterna della spalla", "Flessioni laterali del collo"]
    esercizi = {e.nome: e for e in Esercizio.objects.filter(nome__in=esercizi_nomi)}
    sedute = list(Seduta.objects.all())

    for i, s in enumerate(sedute):
        esercizio_nome = esercizi_nomi[i % len(esercizi_nomi)]
        if esercizio_nome in esercizi:
            Contiene.objects.create(seduta=s, esercizio=esercizi[esercizio_nome])

    # 5. Comunica
    for i in range(10):
        Comunica.objects.create(
            paziente=pazienti[i],
            medico=medici[i],
            data=date(2024, 6, i+1),
            contenuto=f"Messaggio automatico numero {i+1}"
        )

    print("✅ Dati inseriti con successo!")


if __name__ == '__main__':
    popola_database()
