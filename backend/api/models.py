from django.db import models
from django.contrib.auth.models import User

# Base model con metodi comuni
class Persona(models.Model):
    codice_fiscale = models.CharField(max_length=16, primary_key=True)
    nome = models.CharField(max_length=50)
    cognome = models.CharField(max_length=50)
    data_di_nascita = models.DateField()
    genere = models.CharField(max_length=1)
    telefono = models.CharField(max_length=15)
    email = models.EmailField(max_length=100)
    immagine = models.ImageField(upload_to='immagini_persone/', blank=True, null=True)

    class Meta:
        abstract = True


# Paziente eredita da Persona
class Paziente(Persona):
    patologia_da_trattare = models.TextField(null=True, blank=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='paziente', null=True)


# Medico eredita da Persona
class Medico(Persona):
    specializzazione = models.CharField(max_length=50)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='medico', null=True)


# Esercizio
class Esercizio(models.Model):
    nome = models.CharField(max_length=50, primary_key=True)
    categoria = models.CharField(max_length=50)
    video = models.CharField(max_length=255)
    descrizione = models.TextField()


# Seduta
class Seduta(models.Model):
    codice = models.CharField(max_length=10, primary_key=True)
    paziente = models.ForeignKey(Paziente, on_delete=models.CASCADE)
    medico = models.ForeignKey(Medico, on_delete=models.CASCADE)
    data = models.DateTimeField()
    video = models.CharField(max_length=255)
    evaluate_rt = models.TextField()
    evaluate_pt = models.TextField()
    
    TIPO_CHOICES = [
        ('sincrono', 'Sincrono'),
        ('asincrono', 'Asincrono'),
    ]
    tipo = models.CharField(max_length=10, choices=TIPO_CHOICES)


# Contiene (relazione N:N tra Seduta ed Esercizio)
class Contiene(models.Model):
    seduta = models.ForeignKey(Seduta, on_delete=models.CASCADE)
    esercizio = models.ForeignKey(Esercizio, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('seduta', 'esercizio')


# Comunica (messaggistica tra Paziente e Medico)
class Comunica(models.Model):

    MITTENTE_CHOICES = [
        ('medico','Medico'),
        ('paziente','Paziente'),
    ]

    paziente = models.ForeignKey(Paziente, on_delete=models.CASCADE)
    medico = models.ForeignKey(Medico, on_delete=models.CASCADE)
    data = models.DateTimeField()
    contenuto = models.TextField()
    mittente = models.CharField(max_length=10, choices=MITTENTE_CHOICES)
    letto = models.BooleanField(default=False)

    class Meta:
        ordering = ['-data']

# Ogni Paziente può essere associato ad uno o più medici
class Associazione(models.Model):
    paziente = models.ForeignKey(Paziente, on_delete=models.CASCADE)
    medico = models.ForeignKey(Medico, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('paziente', 'medico')  # Evita duplicati