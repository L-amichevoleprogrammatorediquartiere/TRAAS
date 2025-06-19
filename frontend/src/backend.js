// funzione che recupera dei pazienti con messaggi da leggere
export default function fetchPazientiConMessaggi() {
  return [
    { codiceFiscale: 'RSSMRA80A01H501Z', patologia: 'Ipertensione' },
    { codiceFiscale: 'VRDLGI75D22F205G', patologia: 'Asma cronica' },
    { codiceFiscale: 'BNCLNZ90C10F205X', patologia: 'Diabete mellito' },
    { codiceFiscale: 'BNCLNZ90C10F205X', patologia: 'Diabete mellito' },
    { codiceFiscale: 'BNCLNZ90C10F205X', patologia: 'Diabete mellito' },
    { codiceFiscale: 'BNCLNZ90C10F205X', patologia: 'Diabete mellito' },
    { codiceFiscale: 'BNCLNZ90C10F205X', patologia: 'Diabete mellito' },
    { codiceFiscale: 'BNCLNZ90C10F205X', patologia: 'Diabete mellito' },
    { codiceFiscale: 'BNCLNZ90C10F205X', patologia: 'Diabete mellito' },
    { codiceFiscale: 'BNCLNZ90C10F205X', patologia: 'Diabete mellito' },
    { codiceFiscale: 'BNCLNZ90C10F205X', patologia: 'Diabete mellito' },
    { codiceFiscale: 'BNCLNZ90C10F205X', patologia: 'Diabete mellito' },
    { codiceFiscale: 'BNCLNZ90C10F205X', patologia: 'Diabete mellito' },
    { codiceFiscale: 'BNCLNZ90C10F205X', patologia: 'Diabete mellito' },
    { codiceFiscale: 'BNCLNZ90C10F205X', patologia: 'Diabete mellito' },
  ];
}


// cerca pazienti per una stringa all'interno (cerca dentro nome, cognome, CF, patologia)
export function CercaPazienti(query) {
  const data = [
    { codiceFiscale: 'RSSMRA80A01H501Z', patologia: 'Diabete' },
    { codiceFiscale: 'BNCLNZ90C10F205X', patologia: 'Ipertensione' },
    { codiceFiscale: 'VRDLGI75D22F205G', patologia: 'Asma' },
    { codiceFiscale: 'VRDLGI75D22F205G', patologia: 'Asma' },
    { codiceFiscale: 'VRDLGI75D22F205G', patologia: 'Asma' },
    { codiceFiscale: 'VRDLGI75D22F205G', patologia: 'Asma' },
    { codiceFiscale: 'VRDLGI75D22F205G', patologia: 'Asma' },
    { codiceFiscale: 'VRDLGI75D22F205G', patologia: 'Asma' },
    { codiceFiscale: 'VRDLGI75D22F205G', patologia: 'Asma' },
    { codiceFiscale: 'VRDLGI75D22F205G', patologia: 'Asma' },
    { codiceFiscale: 'VRDLGI75D22F205G', patologia: 'Asma' },
    { codiceFiscale: 'VRDLGI75D22F205G', patologia: 'Asma' },
    { codiceFiscale: 'VRDLGI75D22F205G', patologia: 'Asma' },
  ];

  return data.filter(
    p =>
      p.codiceFiscale.toLowerCase().includes(query.toLowerCase()) ||
      p.patologia.toLowerCase().includes(query.toLowerCase())
  );
}


// ritorna ruolo utente che può essere medico o paziente
export function GetUserRole() {
  return new Promise((resolve) => {
    setTimeout(() => resolve('paziente'), 100); // cambia in 'medico' per testare entrambi i casi
  });
}

// ritorna tutti i medici di un paziente
export function GetMedici() {
  return new Promise((resolve) => {
    setTimeout(() => resolve([
      {
        nome: 'Mario',
        cognome: 'Rossi',
        professione: 'Fisioterapista',
        immagine: 'https://via.placeholder.com/50'
      },
      {
        nome: 'Luca',
        cognome: 'Verdi',
        professione: 'Ortopedico',
        immagine: 'https://via.placeholder.com/50'
      }
    ]), 100);
  });
}

// chiama il backend e ritorna le info dell'utente
// ricorda che se è medico dentro patologia devi ritornare ''
export const getInfoUser = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        nome: 'Mario',
        cognome: 'Rossi',
        dataNascita: '1980-05-15',
        genere: 'Maschile',
        numeroTelefono: '+39 123 456 7890',
        email: 'mario.rossi@example.com',
        patologia: 'Ipertensione',
        immagine: 'https://via.placeholder.com/300', // immagine di esempio
      });
    }, 100); // simula 1 secondo di latenza
  });
};


//funzione che recupera le visite fatte e da fare per il medico
export function FetchVisite() {
  return new Promise(resolve => {
    setTimeout(() => resolve([
      {
        title: 'Visita fisioterapica',
        start: new Date('2025-06-15T10:00:00'),
        end: new Date('2025-06-15T11:00:00')
      },
      {
        title: 'Controllo ortopedico',
        start: new Date('2025-06-18T09:30:00'),
        end: new Date('2025-06-18T10:30:00')
      },
      {
        title: 'Seduta posturale',
        start: new Date('2025-06-21T14:00:00'),
        end: new Date('2025-06-21T15:00:00')
      }
    ]), 100);
  });
}

// funzioni fake aggiunte da peppe


export function SedutaPaziente() {
  const sedutePazienteMock = [
    { id: 1, data: "2024-01-01", valutazione: "valutazione: bassa" },
    { id: 2, data: "2024-01-15", valutazione: "valutazione: media" },
    { id: 3, data: "2024-01-29", valutazione: "valutazione: alta" },
  ];

  return sedutePazienteMock;
}

export function SedutaMedico() {
  const seduteMedicoMock = [
    {
      id: 1,
      data: "2024-01-01",
      codice_fiscale: "RSSMRA85T10H501Z",
      valutazione: "valutazione: bassa",
      tiposeduta: "Sincrona",
    },
    {
      id: 2,
      data: "2024-01-15",
      codice_fiscale: "VRDLGI92E15F205S",
      valutazione: "valutazione: media",
      tiposeduta: "Sincrona",
    },
    {
      id: 3,
      data: "2024-01-27",
      codice_fiscale: "BNCLRA78A01H501D",
      valutazione: "valutazione: alta",
      tiposeduta: "Sincrona",
    },
    {
      id: 4,
      data: "2024-01-28",
      codice_fiscale: "BNCLRA78A01H501D",
      valutazione: "valutazione: alta",
      tiposeduta: "Asincrona",
    },
    {
      id: 5,
      data: "2024-01-29",
      codice_fiscale: "BNCLRA78A01H501D",
      valutazione: "valutazione: alta",
      tiposeduta: "Asincrona",
    },
  ];

  return seduteMedicoMock;
}

export function InfoPaziente() {
  return [
    { id: 1, testo: "Respirazione Diaframmatica", descrizione: "Descrizione mock esercizio 1" },
    { id: 2, testo: "Rilassamento Muscolare Progressivo", descrizione: "Descrizione mock esercizio 2" },
    { id: 3, testo: "Esercizio di Visualizzazione", descrizione: "Descrizione mock esercizio 3" },
  ];
}