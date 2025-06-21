import PopUpBig from "../popup/ppbig";
import OpenButton from "../button/openbutton";
import { InfoPaziente } from "../../backend"; // Mock dati esercizi
import { useState } from "react";

// Componente esercizio della lista
function EsercizioDaFare({ testo, bottone }) {
  return (
    <div className="container">
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
          left: "16%",
          width: "68%",
          height: "76%",
          overflowY: "auto",
          zIndex: 1060,
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
        {esercizioSelezionato ? (
          <div
            style={{
              margin: "1cm 4cm",
              border: "2px solid #555",
              borderRadius: "6px",
              padding: "20px",
              backgroundColor: "#eee",
              display: "flex",
              gap: "20px",
            }}
          >
            <div style={{ flex: 2 }}>
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Video mockato
                title="Esercizio Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div style={{ flex: 1 }}>
              <h5>Descrizione esercizio</h5>
              <p>{esercizioSelezionato.descrizione || "Questa è una descrizione mockata dell'esercizio."}</p>

              <button
                className="btn btn-secondary mt-3"
                onClick={() => setEsercizioSelezionato(null)}
              >
                Torna alla lista
              </button>
            </div>
          </div>
        ) : (
          // Nessun esercizio selezionato: mostra lista
          esercizi.map((esercizio) => (
            <div
              key={esercizio.id}
              style={{
                margin: "1cm 4cm",
                border: "2px solid #555",
                borderRadius: "6px",
                padding: "10px 20px",
                backgroundColor: "#eee",
              }}
            >
              <EsercizioDaFare
                testo={esercizio.testo}
                bottone={<OpenButton onClick={() => setEsercizioSelezionato(esercizio)} />}
              />
            </div>
          ))
        )}
      </div>
    </>
  );
}
