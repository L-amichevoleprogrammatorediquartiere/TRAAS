import { useEffect, useState } from "react";
import GrayTable from "../graytable";
import Navbar from "../navbar";
import CercaPazienti from "../pazienti/cercapazienti";
import Paziente from "../pazienti/paziente";
import fetchPazientiConMessaggi from "../../backend";
import PopUpBig from "../popup/ppbig";
import ChatSmall from "../chat/chatsmall";
import InfoUser from "../popup/infouser";

export default function PazientiPage({setView, view}) {
  const [pazientiConMessaggi, setPazientiConMessaggi] = useState([]);

  useEffect(() => {
    async function loadPazienti() {
    try {
      const pazienti = await fetchPazientiConMessaggi();
      console.log('Tipo:', pazienti);
      setPazientiConMessaggi(pazienti);
    } catch (error) {
      console.error('Errore nel caricamento dei pazienti:', error);
    }
  }

  loadPazienti();
  }, []);

  const [popOn, setPopOn] = useState(false);
  const [codiceFiscaleSelezionato, setCodiceFiscaleSelezionato] = useState(null);

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
          />
        ))}
      </div>
      {popOn && (
        <>
          <PopUpBig onClick={()=> setPopOn(false)} onInnerClick={()=> setPopOn(false)}/>
          <InfoUser codiceFiscale={codiceFiscaleSelezionato} />
          <ChatSmall codiceFiscale={codiceFiscaleSelezionato}/>
        </>
      )}
    </>
  );
}
