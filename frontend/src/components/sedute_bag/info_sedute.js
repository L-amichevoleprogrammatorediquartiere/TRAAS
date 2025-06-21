import PopUpBig from "../popup/ppbig";
import InfoEsercizio from "../esercizi/infoesercizio";
import OpenButton from "../button/openbutton";
import { InfoPaziente } from "../../backend"; // Mock dati esercizi
import { useState } from "react";

// Componente esercizio della lista
function EsercizioDaFare({ testo, bottone }) {
  return (
    <div className="container" style={{marginTop:'1.8%'}}>
      <div className="row align-items-center">
        <div className="col">
          <p>{testo}</p>
        </div>
        <div className="col-auto">{bottone}</div>
      </div>
    </div>
  );
}

// Componente principale
export default function ContenitoreInfoPaziente({ showPopup, onClosePopup, sedutaCorrente }) {
  const [esercizioSelezionato, setEsercizioSelezionato] = useState(null); // Stato per esercizio

  const handleCollapseClick = (e) => {
    e.stopPropagation();
    setEsercizioSelezionato(null); // Torna indietro alla lista
    onClosePopup();
  };

  if (!showPopup || !sedutaCorrente) return null;

  const esercizi = InfoPaziente(); // Mock esercizi

  return (
    <>
      <PopUpBig onClick={onClosePopup} onInnerClick={handleCollapseClick} />

      <div
        style={{
          position: "fixed",
          top: "12%",
          left: "19%",
          width: "60%",
          height: "76%",
          overflowY: "auto",
          backgroundColor: "transparent",
        }}
      >
        {/* Titolo popup */}
        <div
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "1.4rem",
            marginBottom: "20px",
          }}
        >
          {sedutaCorrente.testo}
        </div>

        {/* Selezionato: Mostra video e descrizione */}
        {!esercizioSelezionato && 
          // Nessun esercizio selezionato: mostra lista
          esercizi.map((esercizio) => (
            <div
              key={esercizio.id}
              style={{
                margin: "4% 10%",
                height: "16%",
                border: "1px solid black",
                borderRadius: "6px",
                padding: "10px 20px",
                backgroundColor: "#eee",
              }}
            >
              <EsercizioDaFare
                testo={esercizio.testo}
                bottone={<OpenButton onClick={() => setEsercizioSelezionato(esercizio.testo)} />}
              />
            </div>
          ))
        }
      </div>
      {esercizioSelezionato && 
        <>
          <PopUpBig onClick={()=> setEsercizioSelezionato(null)} onInnerClick={()=> setEsercizioSelezionato(null)}/>
          <InfoEsercizio esercizio={esercizioSelezionato} />
        </>}
    </>
  );
}