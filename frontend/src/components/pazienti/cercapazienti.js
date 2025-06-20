import { useState } from 'react';
import SearchButton from "../button/searchbutton";
import OpenButton from "../button/openbutton";
import { CercaPazienti } from "../../backend";

function MiniPaziente({ codiceFiscale, patologia, setPopOn, setCodiceFiscaleSelezionato }) {
  return (
    <div
      style={{
        border: '1px solid black',
        padding: '1%',
        height: '18%',
        backgroundColor: 'var(--bg-div-color)',
        marginBottom: '2%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Contenuto testo */}
      <div style={{ display: 'flex', flexDirection: 'column' , marginLeft: '4%'}}>
        <div>{codiceFiscale}</div>
        <div>{patologia}</div>
      </div>

      {/* Bottone a destra */}
      <OpenButton onClick={()=>{setPopOn(true);setCodiceFiscaleSelezionato(codiceFiscale)}}/>
    </div>
  );
}

export default function CercaPaziente({setPopOn, setCodiceFiscaleSelezionato}) {
  const [query, setQuery] = useState('');
  const [risultati, setRisultati] = useState([]);

  const handleSearch = async () => {
    const risultatiMock = await CercaPazienti(query);
    setRisultati(risultatiMock);
  };

  return (
    <div
      style={{position: 'absolute', width: '35%', height: '70%', top: '20%', left: '5%', backgroundColor: "var(--bg-div-color)"}}
    >
      {/* Barra di ricerca */}
      <div className="d-flex mb-2" style={{position:'absolute', height: '10%', width: '80%', top: '2%', left: '3%' }}>
        <input
          type="text"
          className="form-control me-2"
          placeholder="Cerca paziente..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <div style={{ position: 'absolute', top: '2%', left: '105%' }}>
            <SearchButton onClick={handleSearch} />
        </div>
      </div>

      {/* Risultati scrollabili */}
      <div
        className="overflow-auto"
        style={{ flexGrow: 1 ,position: 'absolute', height: '82%', width: '94%', top: '15%', left: '3%'}}
      >
        {risultati.map((paziente, index) => (
          <MiniPaziente
            key={index}
            codiceFiscale={paziente.codiceFiscale}
            patologia={paziente.patologia}
            setPopOn={setPopOn} setCodiceFiscaleSelezionato={setCodiceFiscaleSelezionato}
          />
        ))}
        {risultati.length === 0 &&
          <div style={{color: 'gray', fontStyle: 'italic', position: 'absolute',
             top: '20%', left: '9%', width:'70%'
          }}>
            Inizia a digitare: puoi cercare per nome, cognome, codice fiscale o patologia. I risultati appariranno qui.
          </div> 
        }
      </div>
    </div>
  );
}
