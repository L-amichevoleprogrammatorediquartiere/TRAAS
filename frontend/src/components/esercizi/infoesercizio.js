import { useEffect, useState } from "react";
import { getEsercizioByName } from "../../backend";

export default function InfoEsercizio({ esercizio }) {
  const [datiEsercizio, setDatiEsercizio] = useState(null);
  const [errore, setErrore] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getEsercizioByName(esercizio);
        if (Array.isArray(result) && result.length > 0) {
          setDatiEsercizio(result[0]);
        } else {
          setErrore("Esercizio non trovato");
        }
      } catch (err) {
        console.error("Errore nel recupero dell'esercizio:", err);
        setErrore("Errore durante la richiesta");
      }
    }

    fetchData();
  }, [esercizio]);

  if (errore) {
    return <div style={{ position: 'absolute', color: "red" }}>{errore}</div>;
  }

  if (!datiEsercizio) {
    return <div>Caricamento...</div>;
  }

  return (
    <div style={{ position:'absolute',width:'68%',height:'65%',left:'15%',top:'12%', textAlign: "center", border: '1px solid black'}}>
      <h2 style={{position:'relative', top:'5%',fontSize:'140%'}}>{datiEsercizio.nome}</h2>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "5%" }}>
        {/* Video */}
        <div style={{ flex: "1", padding: "10px" }}>
          {datiEsercizio.video.startsWith("http") ? (
            <iframe
              width="100%"
              height="250"
              src={datiEsercizio.video}
              title="Video esercizio"
              allowfullscreen/>
          ) : (
            <video width="100%" height="250" controls>
              <source src={datiEsercizio.video} type="video/mp4" />
              Il tuo browser non supporta il tag video.
            </video>
          )}
        </div>

        {/* Descrizione */}
        <div style={{ flex: "1", padding: "2%", textAlign: "left", fontSize:'100%'}}>
          <h4 style={{fontSize:'130%'}}>Descrizione:</h4>
          <p>{datiEsercizio.descrizione}</p>
        </div>
      </div>
    </div>
  );
}
