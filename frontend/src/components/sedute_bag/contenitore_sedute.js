import { useState } from "react";
import { SedutaMedico, SedutaPaziente } from "../../backend";
import InfoButton from "../button/infobutton";
import PlayButton from "../button/playbutton";
import Modifybutton from "../button/modifybutton";
import Partecipa from "../button/partecipa";
import ContenitoreInfoPaziente from "./info_sedute";
import PaginaEsercizio from "./play_seduta"; // Assicurati che il path sia corretto

// Data mockata
const dataMockata = "2024-01-29";

// Componente paziente
function ComponenteSedutePaziente({ testo, valutazione, bottone }) {
  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col">
          <p>{testo}</p>
        </div>
        <div className="col text-end">
          <p>{valutazione}</p>
        </div>
        <div className="col-auto">{bottone}</div>
      </div>
    </div>
  );
}

// Componente medico
function ComponenteSeduteMedico({ testo, tiposeduta, codice_fiscale, valutazione, bottone }) {
  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col">
          <p>{testo}</p>
          <p style={{ fontSize: "0.9em", color: "#555" }}>{tiposeduta}</p> 
        </div>
        <div className="col">
          <p>{codice_fiscale}</p>
        </div>
        <div className="col text-end">
          <p>{valutazione}</p>
        </div>
        <div className="col-auto">{bottone}</div>
      </div>
    </div>
  );
}

// Contenitore paziente
function ContenitoreSedutePaziente() {
  const [showInfo, setShowInfo] = useState(false);
  const [paginaEsercizio, setPaginaEsercizio] = useState(false);
  const [sedutaSelezionata, setSedutaSelezionata] = useState(null);

  const sedute = SedutaPaziente();

  const handleOpenPopup = (seduta) => {
    setSedutaSelezionata(seduta);
    setShowInfo(true);
  };

  const handleClosePopup = () => {
    setShowInfo(false);
    setSedutaSelezionata(null);
  };

  const handlePlayClick = (seduta) => {
    setSedutaSelezionata(seduta);
    setPaginaEsercizio(true);
  };

  const handleCloseEsercizio = () => {
    setPaginaEsercizio(false);
    setSedutaSelezionata(null);
  };

  if (paginaEsercizio) {
    return <PaginaEsercizio seduta={sedutaSelezionata} onBack={handleCloseEsercizio} />;
  }

  return (
    <>
      {sedute.map((seduta) => {
        const isDataMockata = seduta.data === dataMockata;
        const testo = `Seduta del ${seduta.data}`;

        return (
          <div
            key={seduta.id}
            style={{
              margin: "1cm 4cm",
              border: "2px solid #555",
              borderRadius: "6px",
              padding: "10px 20px",
              backgroundColor: "#eee",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <ComponenteSedutePaziente
              testo={testo}
              valutazione={isDataMockata ? "" : seduta.valutazione}
              bottone={
                isDataMockata ? (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <InfoButton onClick={() => handleOpenPopup(seduta)} />
                    <div
                      style={{
                        width: "1px",
                        height: "24px",
                        backgroundColor: "#ccc",
                        margin: "0 8px"
                      }}
                    />
                    <PlayButton onClick={() => handlePlayClick(seduta)} />
                  </div>
                ) : (
                  <InfoButton onClick={() => handleOpenPopup(seduta)} />
                )
              }
            />
          </div>
        );
      })}

      <ContenitoreInfoPaziente
        showPopup={showInfo}
        onClosePopup={handleClosePopup}
        sedutaCorrente={sedutaSelezionata}
      />
    </>
  );
}

// Contenitore medico
function ContenitoreSeduteMedico() {
  const sedute = SedutaMedico();

  const handleClick = () => alert("Hai cliccato il pulsante!");

  return (
    <>
      {sedute.map((seduta) => {
        const isDataMockata = seduta.data === dataMockata;
        const testo = `Seduta del ${seduta.data}`;

        return (
          <div
            key={seduta.id}
            style={{
              margin: "1cm 4cm",
              border: "2px solid #555",
              borderRadius: "6px",
              padding: "10px 20px",
              backgroundColor: "#eee",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <ComponenteSeduteMedico
              testo={testo}
              codice_fiscale={seduta.codice_fiscale}
              valutazione={isDataMockata ? "" : seduta.valutazione}
              tiposeduta={seduta.tiposeduta}
              bottone={
                isDataMockata ? (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Modifybutton onClick={handleClick} />
                    <div
                      style={{
                        width: "1px",
                        height: "24px",
                        backgroundColor: "#ccc",
                        margin: "0 8px"
                      }}
                    />
                    <Partecipa />
                  </div>
                ) : (
                  <InfoButton onClick={handleClick} />
                )
              }
            />
          </div>
        );
      })}
    </>
  );
}

export { ContenitoreSedutePaziente, ContenitoreSeduteMedico };
