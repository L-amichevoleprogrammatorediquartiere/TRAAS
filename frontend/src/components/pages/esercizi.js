import { useEffect, useState } from "react";
import Indicees from "../esercizi/indicees";
import Navbar from "../navbar";
import GrayTable from "../graytable";
import Esercizio from "../esercizi/esercizio";
import PopUpBig from "../popup/ppbig";

import { getEserciziPerCategoria, deleteEsercizio, createEsercizio } from "../../backend"; // importa la funzione
import PlusButton from "../button/plusbutton";

import InfoEsercizio from "../esercizi/infoesercizio";
import CheckButton from "../button/checkbutton";

export default function EserciziPage({ setView, view }) {
  const [categoria, setCategoria] = useState("Arto inferiore");
  const [esercizi, setEsercizi] = useState([]);

  useEffect(() => {
    getEserciziPerCategoria(categoria).then(setEsercizi);
  }, [categoria]); // si aggiorna ogni volta che cambia categoria

  const [popOn, setPopOn] = useState(false);
  const [EsercizioSelezionato, setEsercizioSelezionato] = useState(null);

  const [isAdd, setIsAdd] = useState(false)

  const [formData, setFormData] = useState({
    nome: '',
    video: '',
    descrizione: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Navbar setView={setView} view={view} />
      <GrayTable />
      <Indicees setCategoria={setCategoria}
      setPopOn={setPopOn} setEsercizioSelezionato={setEsercizioSelezionato}/>

      {/* Header categoria + PlusButton */}
      <div style={{
        position: 'absolute',
        top: '20.5%',
        left: '30%',
        width: '66%',
        height: '10%',
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1% 5%",
        fontSize: "120%",
        fontWeight: "bold"
      }}>
        <div>{categoria}</div>
        <PlusButton onClick={()=>setIsAdd(true)}/>
      </div>

      {/* Lista esercizi scrollabile */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '35%',
        width: '57%',
        height: '60%',
        overflowY: "auto",
        padding: "0%",
        display: "flex",
        flexDirection: "column",
        gap: "2%"
      }}>
        {esercizi.map((esercizio, index) => (
          <Esercizio key={index} nome={esercizio.nome} 
          setPopOn={setPopOn} setEsercizioSelezionato={setEsercizioSelezionato}
          onMinusClick={async(nome)=>{
            await deleteEsercizio(nome);
            const updated = await getEserciziPerCategoria(categoria);
            setEsercizi(updated);
          }}/>
        ))}
      </div>

      {/*Qui apriamo il pop up con le info del esercizio */}
      {popOn && (
        <>
          <PopUpBig onClick={()=> setPopOn(false)} onInnerClick={()=> setPopOn(false)}/>
          <InfoEsercizio esercizio={EsercizioSelezionato} />
        </>
      )}

      {isAdd && (
        <>
          <PopUpBig onClick={()=> {
            setIsAdd(false);
            setFormData(()=>({
              nome:'',
              video: '',
              descrizione: ''
            }));
          }} onInnerClick={()=> {
            setIsAdd(false);
            setFormData(()=>({
              nome:'',
              video: '',
              descrizione: ''
            }));
          }}/>
          <div style={{position:'absolute', top: '12%', left: '15%', width: '68%', height: '70%'}}>
            <div style={{position:'absolute', top: '3%', left: '25%', fontSize:'120%'}}>Inserimento nuovo esercizio categoria: <b>{categoria}</b></div>
            <input
              name="nome"
              type="text"
              placeholder="Nome esercizio"
              value={formData.nome}
              onChange={handleChange}
              style={{ position: 'absolute', top: '15%', left: '12%', width: '30%', padding: '5px' }}
            />
            <input
              name="video"
              type="text"
              placeholder="Video"
              value={formData.video}
              onChange={handleChange}
              style={{ position: 'absolute', top: '31%', left: '12%', width: '50%', padding: '5px' }}
            />
            <input
              name="descrizione"
              type="text"
              placeholder="Descrizione"
              value={formData.descrizione}
              onChange={handleChange}
              style={{ position: 'absolute', top: '47%', left: '12%', width: '50%', height: '30%', padding: '5px' }}
            />
            {(formData.nome!=='' && formData.video!=='' && formData.descrizione!=='')&&
              <div style={{ position: 'absolute', top: '99%', left: '88%'}}>
                <CheckButton onClick={async()=>{
                  try {
                    await createEsercizio(formData.nome, categoria, formData.video, formData.descrizione);
                    const nuoviEsercizi = await getEserciziPerCategoria(categoria);
                    setEsercizi(nuoviEsercizi);
                    setFormData({
                      nome: '',
                      video: '',
                      descrizione: ''
                    });
                    setIsAdd(false);
                  } catch (error) {
                    console.error("Errore nella creazione dell'esercizio:", error);
                    // opzionalmente: mostrare un messaggio all'utente
                  }
                }}/>
              </div>
            }
          </div>
        </>
      )}

    </>
  );
}
