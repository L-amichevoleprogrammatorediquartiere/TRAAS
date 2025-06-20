import { useEffect, useState } from "react";
import GrayTable from "../graytable";
import Navbar from "../navbar";
import CercaPazienti from "../pazienti/cercapazienti";
import Paziente from "../pazienti/paziente";
import fetchPazientiConMessaggi,{fetchPazientiAssociati} from "../../backend";

import InfoChat from "../popup/infochat";

export default function PazientiPage({setView, view}) {
  const [pazientiConMessaggi, setPazientiConMessaggi] = useState([]);
  const [pazientiAssociati, setPazientiAssociati] = useState([]);

  const [popOn, setPopOn] = useState(false);
  const [codiceFiscaleSelezionato, setCodiceFiscaleSelezionato] = useState(null);

  useEffect(() => {
    async function loadPazienti() {
    try {
      const pazienti = await fetchPazientiConMessaggi();
      //qui dovremmo chiamare una funzione che ritorna pazienti associati a quel medico
      //attraverso la tabella associazione
      const pazientiAssociati = await fetchPazientiAssociati();

      // Filtra solo i pazienti associati NON già presenti in pazientiConMessaggi
      const soloAssociati = pazientiAssociati.filter(associato => 
        !pazienti.some(paz => paz.codiceFiscale === associato.codiceFiscale)
      );

      setPazientiAssociati(soloAssociati);
      setPazientiConMessaggi(pazienti);
    } catch (error) {
      console.error('Errore nel caricamento dei pazienti:', error);
    }
  }

  loadPazienti();
  }, []);

  return (
    <>
      <Navbar setView={setView} view={view} />
      <GrayTable />
      <CercaPazienti setPopOn={setPopOn} setCodiceFiscaleSelezionato={setCodiceFiscaleSelezionato}/>

      {/* Contenitore scrollabile dei pazienti con messaggi */}
      <div
        style={{
          position: 'absolute',
          height: '70%',
          width: '52%',
          top: '20%',
          left: '42%',
          overflowY: 'auto',
          padding: '1%',
        }}
      >
        {pazientiConMessaggi.map((paziente, index) => (
          <Paziente
            key={index}
            codiceFiscale={paziente.codiceFiscale}
            patologia={paziente.patologia}
            setPopOn={setPopOn} setCodiceFiscaleSelezionato={setCodiceFiscaleSelezionato}
            blu={true}
          />
        ))}
        {pazientiAssociati.map((paziente, index) => (
          <Paziente
            key={index}
            codiceFiscale={paziente.codiceFiscale}
            patologia={paziente.patologia}
            setPopOn={setPopOn} setCodiceFiscaleSelezionato={setCodiceFiscaleSelezionato}
            blu={false}
          />
        ))}
      </div>
      {popOn && (
        <>
          <InfoChat setPopOn={setPopOn} codiceFiscaleSelezionato={codiceFiscaleSelezionato}/>
        </>
      )}
    </>
  );
}
