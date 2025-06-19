import MinusButton from "../button/minusbutton";
import OpenButton from "../button/openbutton";

export default function Esercizio({ nome, setPopOn, setEsercizioSelezionato, onMinusClick }) {
  return (
    <div
      style={{
        border: "1px solid black",
        padding: "1rem",
        marginBottom: "1rem",
        height: "20%", // altezza fissa per gestire percentuali
        backgroundColor: "#f9f9f9",
      }}
    >
      {/* Nome esercizio in alto a sinistra */}
      <div
        style={{
          fontSize: "100%",
          marginBottom: "0.5rem",
          position: 'relative',
          top: '5%',  // leggermente più in alto
          left: '2%',
        }}
      >
        {nome}
      </div>

      {/* Bottone Minus posizionato con percentuali */}
      <div
        style={{
          position: 'relative',
          top: '-50%',   // spostalo verticalmente (percentuale dell'altezza del contenitore)
          left: '70%',  // spostalo orizzontalmente
          width: '5%',
        }}
      >
        <MinusButton onClick={()=>onMinusClick(nome)}/>
      </div>

      {/* Bottone Open posizionato con percentuali */}
      <div
        style={{
          position: 'relative',
          top: '-130%',
          left: '92%',
          width: '5%',
        }}
      >
        <OpenButton onClick={()=>{setPopOn(true);setEsercizioSelezionato(nome)}}/>
      </div>
    </div>
  );
}
