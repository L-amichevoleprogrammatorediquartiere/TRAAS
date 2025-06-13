// funzione che recupera dei pazienti con messaggi da leggere
//cerca nel db se ci sono pazienti con messaggi da leggere utilizzata dentro PazientiPage

// PEPPE bisognerebbe aggiugnere anche alla navbar dalla vista del paziente la notifica vicino
//ai medici di cui abbiamo messaggi da leggere!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

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
//la utilizziamo dentro il componente CercaPazienti!!!!
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
//la utilizziamo continuamente nella navbar!!!
export function GetMedici() {
  return new Promise((resolve) => {
    setTimeout(() => resolve([
      {
        nome: 'Mario',
        cognome: 'Rossi',
        professione: 'Fisioterapista',
        immagine: 'https://via.placeholder.com/50',
        codiceFiscale: 'CRSGNN03TigerCS'
      },
      {
        nome: 'Luca',
        cognome: 'Verdi',
        professione: 'Ortopedico',
        immagine: 'https://via.placeholder.com/50',
        codiceFiscale: 'CRSGNN03TigerCs'
      }
    ]), 100);
  });
}

// chiama il backend e ritorna le info dell'utente in uso!!!!!!!!!!
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
        codiceFiscale: 'CRSGNN03TigerCs'
      });
    }, 100); // simula 1 secondo di latenza
  });
};


//funzione che recupera le visite fatte e da fare per il medico
//la utilizziamo dentro il componenete CalendarAgenda!!!!
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


//funzione che carica tutti gli esercizi dal database per metterli nell'elenco puntato
//la utilizziamo dentro il componente Indiciees!!!
export function caricaEsercizi() {
  const datiMock = [
    { nome: 'Estensione ginocchio da seduto', categoria: 'Arto inferiore' },
    { nome: 'Sollevamento gamba tesa', categoria: 'Arto inferiore' },
    { nome: 'Abduzione dell’anca in decubito laterale', categoria: 'Arto inferiore' },
    { nome: 'Flessione plantare in piedi', categoria: 'Arto inferiore' },

    { nome: 'Sollevamento del braccio con bastone', categoria: 'Arto inferiore' },
    { nome: 'Rotazione esterna della spalla', categoria: 'Arto inferiore' },
    { nome: 'Estensione del gomito con pesetti', categoria: 'Arto inferiore' },
    { nome: 'Mobilizzazione del polso con palla', categoria: 'Arto inferiore' },

    { nome: 'Rotazioni del tronco da seduto', categoria: 'Busto' },
    { nome: 'Flessioni laterali del busto in piedi', categoria: 'Busto' },
    { nome: 'Estensione lombare a pancia in giù', categoria: 'Busto' },

    { nome: 'Rotazioni del collo', categoria: 'Collo' },
    { nome: 'Flessioni laterali del collo', categoria: 'Collo' },
    { nome: 'Chin tucks (ritrazione cervicale)', categoria: 'Collo' },

    { nome: 'Camminata su linea retta', categoria: 'Equilibrio' },
    { nome: 'Stazione su un piede', categoria: 'Equilibrio' },
    { nome: 'Passaggi da seduto a in piedi senza mani', categoria: 'Equilibrio' },

    { nome: 'Respirazione diaframmatica', categoria: 'Respirazione' },
    { nome: 'Espirazione con labbra socchiuse', categoria: 'Respirazione' },
    { nome: 'Espansione toracica controllata', categoria: 'Respirazione' },
  ];

  return Promise.resolve(datiMock); // ritorna una Promise con i dati
}


//funzione che cerca gli esercizi nel database per categoria
//la utilizziamo dentro il componente EserciziPage!!!
export function getEserciziPerCategoria(categoria = "Arto inferiore") {
  const tuttiEsercizi = [
    { nome: 'Estensione ginocchio da seduto', categoria: 'Arto inferiore' },
    { nome: 'Sollevamento gamba tesa', categoria: 'Arto inferiore' },
    { nome: 'Rotazione esterna della spalla', categoria: 'Arto inferiore' },
    { nome: 'Sollevamento gamba tesa', categoria: 'Arto inferiore' },
    { nome: 'Rotazione esterna della spalla', categoria: 'Arto inferiore' },
    { nome: 'Sollevamento gamba tesa', categoria: 'Arto inferiore' },
    { nome: 'Rotazione esterna della spalla', categoria: 'Arto inferiore' },
    { nome: 'Sollevamento gamba tesa', categoria: 'Arto inferiore' },
    { nome: 'Rotazione esterna della spalla', categoria: 'Arto inferiore' },
  ];

  const filtrati = tuttiEsercizi.filter(e => e.categoria === categoria);
  return Promise.resolve(filtrati);
}


//questa funzione recupera le info di un singolo paziente cercando attraverso il codice fiscale
//la utilizziamo dentro il componente InfoUser!!!
export function RecuperaInfoPaziente(codiceFiscale) {
  return Promise.resolve({
    nome: "Mario",
    cognome: "Rossi",
    sesso: "M",
    datadinascita: "01/01/1980",
    patologia: "Lombalgia cronica",
    email: "mario.rossi@example.com",
    telefono: "1234567890",
    immagine: "https://via.placeholder.com/100",
    codiceFiscale,
  });
}

//questa funzione recupera le info di un singolo medico cercando attraverso il codice fiscale
//la utilizziamo dentro il componente InfoUser!!!
export function RecuperaInfoMedico(codiceFiscale) {
  return Promise.resolve({
    nome: "Giulia",
    cognome: "Bianchi",
    sesso: "F",
    datadinascita: "15/03/1975",
    professione: "Fisioterapista",
    email: "giulia.bianchi@example.com",
    telefono: "0987654321",
    immagine: "https://via.placeholder.com/100",
  });
}



export const getMessages = async ( limit, codiceFiscale) => {
  
  const mockAllMessages = [
    { id: 27, text: 'Ultimo messaggio ricevutotesttesttesttesttesttesttesttesttesttesttesttesttesttesttest', sender: 'other', timestamp: '2025-05-25T18:15:00Z' },
    { id: 26, text: 'Hai studiato oggi?testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest', sender: 'me', timestamp: '2025-05-25T18:10:00Z' },
    { id: 25, text: 'Sì, un po\' di React', sender: 'other', timestamp: '2025-05-25T18:05:00Z' },
    { id: 24, text: 'Bravo! Continua così', sender: 'me', timestamp: '2025-05-25T18:00:00Z' },
    { id: 23, text: 'Che fai stasera?', sender: 'me', timestamp: '2025-05-25T17:30:00Z' },
    { id: 22, text: 'Vado al cinema!', sender: 'other', timestamp: '2025-05-25T17:00:00Z' },
    { id: 21, text: 'Poi mi racconti com è andata?', sender: 'me', timestamp: '2025-05-25T16:55:00Z' },
    { id: 20, text: 'Certo!', sender: 'other', timestamp: '2025-05-25T16:50:00Z' },
    { id: 19, text: 'A domani allora!', sender: 'me', timestamp: '2025-05-25T16:45:00Z' },
    { id: 18, text: 'Notte!', sender: 'other', timestamp: '2025-05-25T16:40:00Z' },
        //2025-05-24
    { id: 17, text: 'Oggi è stata una giornata lunga...', sender: 'me', timestamp: '2025-05-24T21:30:00Z' },
    { id: 16, text: 'Già, sono stanchissimo', sender: 'other', timestamp: '2025-05-24T21:25:00Z' },
    { id: 15, text: 'Domani relax!', sender: 'me', timestamp: '2025-05-24T21:20:00Z' },
    { id: 14, text: 'Magari 😅', sender: 'other', timestamp: '2025-05-24T21:15:00Z' },
    { id: 13, text: 'Buonanotte', sender: 'me', timestamp: '2025-05-24T21:10:00Z' },

    { id: 12, text: 'Ci vediamo tra poco', sender: 'other', timestamp: '2025-05-24T16:30:00Z' },
    { id: 11, text: 'Porta i documenti!', sender: 'me', timestamp: '2025-05-24T16:20:00Z' },
    { id: 10, text: 'Sì certo', sender: 'other', timestamp: '2025-05-24T16:10:00Z' },
        //2025-05-23
    { id: 9, text: 'Hai fatto il backup del database?', sender: 'me', timestamp: '2025-05-23T22:00:00Z' },
    { id: 8, text: 'Non ancora 😬', sender: 'other', timestamp: '2025-05-23T21:50:00Z' },
    { id: 7, text: 'Ricordati che è importante!', sender: 'me', timestamp: '2025-05-23T21:45:00Z' },
    { id: 6, text: 'Va bene, lo faccio adesso', sender: 'other', timestamp: '2025-05-23T21:40:00Z' },

    { id: 5, text: 'Ti piace questa nuova UI?', sender: 'me', timestamp: '2025-05-23T14:10:00Z' },
    { id: 4, text: 'Sì molto! È più pulita', sender: 'other', timestamp: '2025-05-23T14:05:00Z' },

    { id: 3, text: 'Perfetto!', sender: 'me', timestamp: '2025-05-23T09:05:00Z' },
    { id: 2, text: 'Tutto bene, grazie!', sender: 'other', timestamp: '2025-05-23T09:00:00Z' },
    { id: 1, text: 'Bene, tu?', sender: 'me', timestamp: '2025-05-23T10:02:00Z' },
        // ricordati che Django i messaggi deve passarli con questa sintassi id: 1, 2 ..... 9, text:, sender: (me o other), timestamp:
  ];  

  return mockAllMessages.reverse().slice(-limit).reverse();
};