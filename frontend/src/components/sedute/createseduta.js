import { useState, useEffect } from "react";
import { aggiungiSeduta, caricaEsercizi } from "../../backend";
import PlusButton from "../button/plusbutton";

export default function CreateSeduta({ codiceFiscale, setIsAssegna }) {
  const [dataSeduta, setDataSeduta] = useState("");
  const [tipoSeduta, setTipoSeduta] = useState("sincrono");
  const [esercizi, setEsercizi] = useState([]);
  const [selectedEsercizi, setSelectedEsercizi] = useState({}); // id/nome -> boolean

  useEffect(() => {
    async function load() {
      const eserciziDaBackend = await caricaEsercizi();
      if (eserciziDaBackend) setEsercizi(eserciziDaBackend);
    }
    load();
  }, []);

  // Raggruppa esercizi per categoria
  const grouped = esercizi.reduce((acc, es) => {
    acc[es.categoria] = acc[es.categoria] || [];
    acc[es.categoria].push(es);
    return acc;
  }, {});

  // Gestione checkbox
  const toggleEsercizio = (nome) => {
    setSelectedEsercizi(prev => ({
      ...prev,
      [nome]: !prev[nome]
    }));
  };

  const handleSubmit = async () => {
    try {
        const result = await aggiungiSeduta(codiceFiscale, dataSeduta, tipoSeduta, selectedEsercizi);

        if (result) {
        // Seduta creata con successo
        setIsAssegna(false); // Chiudi il popup
        } else {
        // Potresti mostrare un messaggio di errore all'utente
        console.error("Errore durante la creazione della seduta");
        }
    } catch (error) {
        console.error("Errore in handleSubmit:", error);
        // Magari mostra un messaggio d’errore a schermo
    }
  };


  return (
    <div style={{position:'absolute', top:'15%',left:'17%', width: '62%',height:'73%'}}>
      
      <div style={{position:'absolute', top:'1%',left:'28%', fontSize:'115%'}}>
        Assegnazione seduta paziente: <b>{codiceFiscale}</b>
      </div>
      
      <div style={{position:'absolute', top:'14%',left:'1%'}}>
        <label>Data Seduta:</label><br />
        <input type="date" value={dataSeduta} onChange={e => setDataSeduta(e.target.value)} />
      </div>

      <div style={{position:'absolute', top:'29%',left:'1%'}}>
        <label>Tipo Seduta:</label><br />
        <label>
          <input
            type="radio"
            name="tipoSeduta"
            value="sincrono"
            checked={tipoSeduta === "sincrono"}
            onChange={e => setTipoSeduta(e.target.value)}
          />
          Sincrono
        </label>
        <label style={{ marginLeft: 20 }}>
          <input
            type="radio"
            name="tipoSeduta"
            value="asincrono"
            checked={tipoSeduta === "asincrono"}
            onChange={e => setTipoSeduta(e.target.value)}
          />
          Asincrono
        </label>
      </div>

      <div style={{ position:'absolute', top:'45%',left:'1%', width: '90%', height:'40%', overflowY: "scroll", border: "1px solid black", backgroundColor:'#f9f9f9'}}>
        {Object.entries(grouped).map(([categoria, eserciziCat]) => (
          <div key={categoria} style={{ marginBottom: 15, marginLeft:'2%' }}>
            <div style={{ fontWeight: "bold", marginBottom: 5 }}>{categoria}</div>
            {eserciziCat.map(es => (
              <label key={es.nome} style={{ display: "block", cursor: "pointer", userSelect: "none" }}>
                <input
                  type="checkbox"
                  checked={!!selectedEsercizi[es.nome]}
                  onChange={() => toggleEsercizio(es.nome)}
                  style={{ marginRight: 8 }}
                />
                {es.nome}
              </label>
            ))}
          </div>
        ))}
      </div>
        {(dataSeduta!=='' && esercizi.length > 0) &&
            <>
                <div style={{position:'absolute', top:'91%',left:'93%'}}>
                    <PlusButton onClick={handleSubmit} disabled={!dataSeduta}/>
                </div>
            </>
        }
    </div>
  );
}
