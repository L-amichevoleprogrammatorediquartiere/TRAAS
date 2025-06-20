import { useEffect, useState } from "react";
import Indicees from "../esercizi/indicees";
import Navbar from "../navbar";
import GrayTable from "../graytable";
import Esercizio from "../esercizi/esercizio";
import PopUpBig from "../popup/ppbig";

import { getEserciziPerCategoria, deleteEsercizio, createEsercizio } from "../../backend"; // importa la funzione
import PlusButton from "../button/plusbutton";

import InfoEsercizio from "../esercizi/infoesercizio";
import AddEsercizio from "../esercizi/addesercizio";

export default function EserciziPage({ setView, view }) {
  const [categoria, setCategoria] = useState("Arto inferiore");
  const [esercizi, setEsercizi] = useState([]);

  useEffect(() => {
    getEserciziPerCategoria(categoria).then(setEsercizi);
  }, [categoria]); // si aggiorna ogni volta che cambia categoria

  const [popOn, setPopOn] = useState(false);
  const [EsercizioSelezionato, setEsercizioSelezionato] = useState(null);

  const [isAdd, setIsAdd] = useState(false)

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

      {isAdd && <AddEsercizio setIsAdd={setIsAdd} categoria={categoria} setEsercizi={setEsercizi}/>}
    </>
  );
}
