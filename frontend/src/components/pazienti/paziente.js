import OpenButton from "../button/openbutton";

export default function Paziente({ codiceFiscale, patologia, setPopOn, setCodiceFiscaleSelezionato }) {
  return (
    <div
      style={{
        border: '1px solid black',
        padding: '1%',
        height: '18%',
        backgroundColor: 'var(--bg-div-color)',
        marginBottom: '2%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Contenuto testo */}
      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '4%' }}>
        {/* Riga con cerchietto blu + codice fiscale */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5%' }}>
          <div>{codiceFiscale}</div>
          {/* Cerchietto blu */}
          <div
            style={{
                position: 'absolute',  
                width: '2.4%',
                height: '3.4%',
                borderRadius: '50%',
                backgroundColor: 'var(--bs-primary)',
                marginLeft: '24%',
            }}
          ></div>
        </div>

        {/* Patologia */}
        <div>{patologia}</div>
      </div>

      {/* Bottone a destra */}
      <OpenButton onClick={() => {setPopOn(true); setCodiceFiscaleSelezionato(codiceFiscale)}}/>
    </div>
  );
}
