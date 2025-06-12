import { useEffect, useState } from "react";
import GrayTable from "../graytable";
import Navbar from "../navbar";
import CercaPazienti from "../pazienti/cercapazienti";
import Paziente from "../pazienti/paziente";
import fetchPazientiConMessaggi from "../../backend";

export default function PazientiPage() {
  const [pazientiConMessaggi, setPazientiConMessaggi] = useState([]);

  useEffect(() => {
    const pazienti = fetchPazientiConMessaggi();
    setPazientiConMessaggi(pazienti);
  }, []);

  return (
    <>
      <Navbar />
      <GrayTable />
      <CercaPazienti />

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
          />
        ))}
      </div>
    </>
  );
}
