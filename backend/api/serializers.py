from rest_framework import serializers
from .models import Paziente, Medico, Seduta, Esercizio, Contiene, Comunica, Associazione

class PazienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paziente
        fields = '__all__'


class MedicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medico
        fields = '__all__'


class SedutaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seduta
        fields = '__all__'


class EsercizioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Esercizio
        fields = '__all__'


class ContieneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contiene
        fields = '__all__'


class ComunicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comunica
        fields = '__all__'

class AssociazioneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Associazione
        fields = '__all__'