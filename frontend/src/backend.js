const API_BASE = 'http://localhost:8000/api';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';


async function checkAndRefreshToken() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

  if (!accessToken || !refreshToken) {
    throw new Error('No tokens stored');
  }

  // Decodifica payload del token access per verificare scadenza
  const payloadBase64 = accessToken.split('.')[1];
  const payloadJson = atob(payloadBase64);
  const payload = JSON.parse(payloadJson);
  const now = Math.floor(Date.now() / 1000);

  if (payload.exp > now + 60) {  // token ancora valido con 60s margine
    return accessToken;
  }

  // Token scaduto, esegui refresh
  const response = await fetch(`${API_BASE}/token/refresh/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ refresh: refreshToken })
  });

  if (!response.ok) {
    throw new Error('Refresh token expired or invalid');
  }

  const data = await response.json();
  localStorage.setItem(ACCESS_TOKEN_KEY, data.access); // aggiorna access token
  return data.access;
}


//per effettuare il login al sito dovrebbe tornare true se ha esito positivo e false se ha esito negativo
export async function login(codiceFiscale, password) {   //NON TOCCARE CHE FUNZIONA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  var username=codiceFiscale;
  try {
    const response = await fetch(`${API_BASE}/token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!response.ok) {
      const errorMessage = response.status === 401
        ? 'Credenziali non valide.'
        : 'Errore durante la connessione al server.';
      throw new Error(errorMessage);
    }

    const data = await response.json();

    // Salva i token
    localStorage.setItem('accessToken', data.access);
    localStorage.setItem('refreshToken', data.refresh);

    return data; // In caso ti serva fare qualcosa con i token

  } catch (error) {
    throw error; // Gestirai questo nel componente
  }
}

// funzione che recupera dei pazienti con messaggi da leggere
//cerca nel db se ci sono pazienti con messaggi da leggere utilizzata dentro PazientiPage

// PEPPE bisognerebbe aggiugnere anche alla navbar dalla vista del paziente la notifica vicino
//ai medici di cui abbiamo messaggi da leggere!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//fetchPazientiConMessaggi  IT WORKS!!!!
// codicefiscale del dottore ritorna clienti con messaggi da leggere -> formato codicefiscale, patologia
export default async function fetchPazientiConMessaggi(codiceFiscale) {   //NON TOCCARE CHE FUNZIONA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  try {
    const token = await checkAndRefreshToken();

    const response = await fetch(`${API_BASE}/fetchPazientiConMessaggi/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Errore nel recupero dei pazienti con messaggi');
    }

    const data = await response.json();
    console.log(data);
    return data;
  }catch (error) {
    console.error('Errore in fetchPazientiConMessaggi:', error.message);
    return null;
  }
}


// cerca pazienti per una stringa all'interno (cerca dentro nome, cognome, CF, patologia)
//la utilizziamo dentro il componente CercaPazienti!!!!

//CercaPazienti   IT WORKS!!!!
// passiamo una stringa e cercheremo dentro: nome, cognome, CF o patologia -> pazienti formato codicefiscale, patologia
export async function CercaPazienti(query) {   //NON TOCCARE CHE FUNZIONA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //curl "http://localhost:8000/api/cercaPazienti/?query=spalla"
  try {
    const encodedQuery = encodeURIComponent(query);
    const response = await fetch(`${API_BASE}/cercaPazienti/?query=${encodedQuery}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // eventuale Authorization se serve, qua non serve....
      },
    });

    if (!response.ok) {
      throw new Error('Errore nella richiesta');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Errore nel fetch cercaPazienti:", error);
    throw error;
  }
}


// ritorna ruolo utente che può essere medico o paziente   IT WORKS!!!!
//bisogna passargli il token access e può restituire {"role":"paziente"} oppure {"role":"medico"}
export async function GetUserRole() {   //NON TOCCARE CHE FUNZIONA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  try {
    const token = await checkAndRefreshToken();

    const response = await fetch(`${API_BASE}/getUserRole/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Errore nel recupero del ruolo');
    }

    const data = await response.json();
    return data.role; // "medico" o "paziente"
  } catch (error) {
    console.error('Errore in GetUserRole:', error.message);
    return null;
  }

}

// ritorna tutti i medici di un paziente
//la utilizziamo continuamente nella navbar!!!    IT WORKS!!!!
//qui abbiamo un altro problema perchè la funzione getMedici presume che ogni paziente sia associato ad uno o più medici
//Per risolvere il problema è  stata aggiunta la tabella Associazione, da tenere conto anche nel tasto assegna sedute
//passiamo il token access e ci deve ritornare i medici nel seguente formato -> Nome, cognome, professione, immagine, codicefiscale
export async function GetMedici() {   //NON TOCCARE CHE FUNZIONA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  try {
    const token = await checkAndRefreshToken();

    const response = await fetch(`${API_BASE}/getMedici/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Errore nel recupero dei medici');
    }

    const data = await response.json();
    console.log(data);
    return data; // "medico" o "paziente"
  } catch (error) {
    console.error('Errore in GetMedici:', error.message);
    return null;
  }
}

// chiama il backend e ritorna le info dell'utente in uso!!!!!!!!!!    IT WORKS!!!!
// ricorda che se è medico dentro patologia devi ritornare ''
//passimao il token access e ci ritorna -> nome, cognome, dataNascita, genere, numero di telefono, email, patologia, immagine, codicefiscale
export const getInfoUser = async () => {   //NON TOCCARE CHE FUNZIONA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  try {
    const token = await checkAndRefreshToken();

    const response = await fetch(`${API_BASE}/getInfoUser/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Errore nel recupero delle info Utente');
    }

    const data = await response.json();
    console.log(data);
    return data; 
  } catch (error) {
    console.error('Errore in GetInfoUser:', error.message);
    return null;
  }
};


//funzione che recupera le visite fatte e da fare per il medico    IT WORKS!!!!
//la utilizziamo dentro il componenete CalendarAgenda!!!!
//dobbiamo passargli il codicefiscale del medico per capire quali fisite deve fare senno come si deve comportare ): (spoiler i was wrong we already have the access token)
//formato seduta title, start ed end
export async function FetchVisite(codiceFiscale) {   //NON TOCCARE CHE FUNZIONA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //\http://localhost:8000/api/fetchVisite/
  try {
    const token = await checkAndRefreshToken();

    const response = await fetch(`${API_BASE}/fetchVisite/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Errore nel recupero delle visite medico');
    }

    const data = await response.json();
    console.log(data);
    return data; 
  } catch (error) {
    console.error('Errore in fetchVisite:', error.message);
    return null;
  }
}


//funzione che carica tutti gli esercizi dal database per metterli nell'elenco puntato    IT WORKS!!!!
//la utilizziamo dentro il componente Indiciees!!!
export async function caricaEsercizi() {   //NON TOCCARE CHE FUNZIONA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  try {
    const response = await fetch(`${API_BASE}/caricaEsercizi/`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Errore nel recupero delle info Utente');
    }

    const data = await response.json();
    console.log(data);
    return data; 
  } catch (error) {
    console.error('Errore in caricaEsercizi:', error.message);
    return null;
  }
}


//funzione che cerca gli esercizi nel database per categoria    IT WORKS!!!!
//la utilizziamo dentro il componente EserciziPage!!! (vai a capirlo)
//[{"nome":"Estensione ginocchio da seduto","categoria":"Arto inferiore","video":"--","descrizione":"--"},
export async function getEserciziPerCategoria(categoria = "Arto inferiore") {   //NON TOCCARE CHE FUNZIONA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  try {
    const encodedCategoria = encodeURIComponent(categoria);
    const response = await fetch(`${API_BASE}/getEserciziPerCategoria/?categoria=${encodedCategoria}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // eventuale Authorization se serve, qua non serve....
      },
    });

    if (!response.ok) {
      throw new Error('Errore nella richiesta');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Errore nel fetch degli esercizi:", error);
    throw error;
  }
}


//questa funzione recupera le info di un singolo paziente cercando attraverso il codice fiscale
//la utilizziamo dentro il componente InfoUser!!!
export async function RecuperaInfoPaziente(codiceFiscale) {   //NON TOCCARE CHE FUNZIONA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  try {
    const response = await fetch(`${API_BASE}/recuperaInfoPaziente/?codiceFiscale=${codiceFiscale}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // eventuale Authorization se serve, qua non serve....
      },
    });

    if (!response.ok) {
      throw new Error('Errore nella richiesta');
    }

    const data = await response.json();

    console.log(data)

    return data;

  } catch (error) {
    console.error("Errore nel recuperInfoPaziente:", error);
    throw error;
  }
}

//questa funzione recupera le info di un singolo medico cercando attraverso il codice fiscale
//la utilizziamo dentro il componente InfoUser!!!
export async function RecuperaInfoMedico(codiceFiscale) {   //NON TOCCARE CHE FUNZIONA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  try {
    const response = await fetch(`${API_BASE}/recuperaInfoMedico/?codiceFiscale=${codiceFiscale}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // eventuale Authorization se serve, qua non serve....
      },
    });

    if (!response.ok) {
      throw new Error('Errore nella richiesta');
    }

    const data = await response.json();

    console.log(data)

    return data;

  } catch (error) {
    console.error("Errore nel recuperInfoPaziente:", error);
    throw error;
  }
}


//formato messaggi: id: (dal messaggio più vecchio al più nuovo quindi in ordine crescente), text:,
// sender:(può essere o "other" o "me" questo viene in base all'username) ed infine timestamp: "2025-05-25T16:50:00Z"
export const getMessages = async ( limit, codiceFiscale) => {   //NON TOCCARE CHE FUNZIONA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //curl -X GET "http://localhost:8000/api/getMessages/?codiceFiscale=DRSSLC70A01H501T" \ 
  try {
    const token = await checkAndRefreshToken();

    const response = await fetch(`${API_BASE}/getMessages/?codiceFiscale=${codiceFiscale}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error('Errore nella richiesta');
    }

    const data = await response.json();

    console.log(data)

    if (!Array.isArray(data)) {
      throw new Error("Il server non ha restituito un array.");
    }

    // Ordina per ultimi N messaggi mantenendo l’ordine originale
    return data.slice(-limit).reverse();

  } catch (error) {
    console.error("Errore in getMessages:", error);
    throw error;
  }

  //return mockAllMessages.reverse().slice(-limit).reverse();
};


//curl -X GET "http://localhost:8000/api/esercizi/?nome=Stazione%20su%20un%20piede"
//[{"nome":"Stazione su un piede","categoria":"Equilibrio","video":"--","descrizione":"--"}
export async function getEsercizioByName(nome){
  try {
    const encodedName = encodeURIComponent(nome);
    const response = await fetch(`${API_BASE}/esercizi/?nome=${encodedName}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // eventuale Authorization se serve, qua non serve....
      },
    });

    if (!response.ok) {
      throw new Error('Errore nella richiesta');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Errore nel fetch getEsercizioByName:", error);
    throw error;
  }
}


/*curl -X POST http://localhost:8000/api/inviaMessaggio/ \
  -H "Content-Type: application/json" \
  -d '{"codiceFiscale": "FLCGRN89M20H501P", "contenuto": "ciao"}'*/
export async function inviaMessaggio(codiceFiscale, contenuto){
    try {
      const token = await checkAndRefreshToken();

      const response = await fetch(`${API_BASE}/inviaMessaggio/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          codiceFiscale: `${codiceFiscale}`,
          contenuto: `${contenuto}`
        })
      });

      if (!response.ok) {
        throw new Error('Errore nella richiesta');
      }

      const data = await response.json();
      console.log(data);
    }catch (error) {
      console.error("Errore nel fetch inviaMessaggio:", error);
      throw error;
  }
}


/*curl -X POST http://localhost:8000/api/registerUser/ \
  -H "Content-Type: multipart/form-data" \
  -F "codice_fiscale=ABCDEF12G34H567I" \
  -F "nome=Mario" \
  -F "cognome=Rossi" \
  -F "data_di_nascita=1990-01-01" \
  -F "genere=M" \
  -F "telefono=1234567890" \
  -F "email=mario.rossi@example.com" \
  -F "password=G34H567I" \
  -F "ruolo=paziente" \
  -F "patologia_da_trattare=Diabete di tipo 2" \
  -F "immagine=@1000022989.jpg"*/
export async function registerUser(formData){
  try {
    const response = await fetch(`${API_BASE}/registerUser/`, {
      method: "POST",
      body: formData, // NON serve specificare Content-Type, lo gestisce il browser
    });

    if (!response.ok) {
      throw new Error("Errore nella richiesta");
    }

    const data = await response.json();
    console.log("Registrazione avvenuta con successo:", data);
  } catch (error) {
    console.error("Errore durante la registrazione:", error);
  }
}
    

export async function updateUser(formData){
  try{
    const token = await checkAndRefreshToken();

    const response = await fetch(`${API_BASE}/updateUser/`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData, // NON serve specificare Content-Type, lo gestisce il browser
    });

    if (!response.ok) {
      throw new Error("Errore nella richiesta");
    }

    const data = await response.json();
    console.log("Registrazione avvenuta con successo:", data);

  } catch(error){
    console.error("Errore durante la modifica dell'utente:", error);
  }
}


export async function deleteEsercizio(nome) {
  try {
    const token = await checkAndRefreshToken();

    const response = await fetch(`${API_BASE}/deleteEsercizio/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Errore durante l\'eliminazione');
    }

    const result = await response.json();
    console.log('Esercizio eliminato con successo:', result);
    return result;

  } catch (error) {
    console.error('Errore nella richiesta DELETE:', error);
    throw error;
  }
}


export async function createEsercizio(nome,categoria,video,descrizione){
  try {
    const token = await checkAndRefreshToken();

    const response = await fetch(`${API_BASE}/createEsercizio/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome,categoria,video,descrizione })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Errore durante la creazione');
    }

    const result = await response.json();
    console.log('Esercizio creato con successo:', result);
    return result;

  } catch (error) {
    console.error('Errore nella richiesta createEsercizio:', error);
    throw error;
  }
}


export async function fetchPazientiAssociati() {   //NON TOCCARE CHE FUNZIONA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  try {
    const token = await checkAndRefreshToken();

    const response = await fetch(`${API_BASE}/fetchPazientiAssociati/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Errore nel recupero dei pazienti con messaggi');
    }

    const data = await response.json();
    console.log(data);
    return data;
  }catch (error) {
    console.error('Errore in fetchPazientiAssociati:', error.message);
    return null;
  }
}



export async function aggiungiSeduta(codiceFiscale, data, tipo, esercizi) {
  try {
    const token = await checkAndRefreshToken();

    const response = await fetch(`${API_BASE}/aggiungiSeduta/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        codiceFiscale,
        data,
        tipo,
        esercizi, // array di nomi esercizi
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Errore nella creazione della seduta:', errorData);
      throw new Error('Errore nella creazione della seduta');
    }

    const result = await response.json();
    console.log('Seduta creata con successo:', result);
    return result;

  } catch (error) {
    console.error('Errore in creaSeduta:', error.message);
    return null;
  }
}