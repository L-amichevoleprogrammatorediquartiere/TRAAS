import { ComponenteSedutePaziente, ComponenteSeduteMedico } from "./componente_sedute";
import InfoButton from "./button/infobutton";

// Dati mock
const sedutePazienteMock = [
  {
    id: 1,
    testo: "Seduta del 01/01/2024",
    valutazione: "valutazione: bassa"
  },
  {
    id: 2,
    testo: "Seduta del 15/01/2024",
    valutazione: "valutazione: media"
  },
  {
    id: 3,
    testo: "Seduta del 29/01/2024",
    valutazione: "valutazione: alta"
  }
];

const seduteMedicoMock = [
  {
    id: 1,
    testo: "Seduta del 01/01/2024",
    codice_fiscale: "RSSMRA85T10H501Z",
    valutazione: "valutazione: bassa"
  },
  {
    id: 2,
    testo: "Seduta del 15/01/2024",
    codice_fiscale: "VRDLGI92E15F205S",
    valutazione: "valutazione: media"
  },
  {
    id: 3,
    testo: "Seduta del 29/01/2024",
    codice_fiscale: "BNCLRA78A01H501D",
    valutazione: "valutazione: alta"
  },
  {
    id: 4,
    testo: "Seduta del 29/01/2024",
    codice_fiscale: "BNCLRA78A01H501D",
    valutazione: "valutazione: alta"
  },
  {
  id: 5,
    testo: "provaaaaaa",
    codice_fiscale: "BNCLRA78A01H501D",
    valutazione: "valutazione: alta"
  }
];

function ContenitoreSedutePaziente() {
  const handleClick = () => alert("Hai cliccato il pulsante!");

  return (
    <>
      {sedutePazienteMock.map((seduta) => (
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
            testo={seduta.testo}
            valutazione={seduta.valutazione}
            bottone={<InfoButton onClick={handleClick} />}
          />
        </div>
      ))}
    </>
  );
}

function ContenitoreSeduteMedico() {
  const handleClick = () => alert("Hai cliccato il pulsante!");

  return (
    <>
      {seduteMedicoMock.map((seduta) => (
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
            testo={seduta.testo}
            codice_fiscale={seduta.codice_fiscale}
            valutazione={seduta.valutazione}
            bottone={<InfoButton onClick={handleClick} />}
          />
        </div>
      ))}
    </>
  );
}

export { ContenitoreSedutePaziente, ContenitoreSeduteMedico };
