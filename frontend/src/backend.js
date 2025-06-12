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
    setTimeout(() => resolve('paziente'), 500); // cambia in 'medico' per testare entrambi i casi
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
    ]), 500);
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