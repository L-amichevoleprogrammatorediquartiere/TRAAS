import ComponenteSedute from "./componente_sedute";
import InfoButton from "./button/infobutton";



function ContenitoreSedute() {
  const handleClick = () => alert('Hai cliccato il pulsante!');

  return (
    <div
      style={{
        margin: '1cm 4cm',        // margini come volevi
        border: '2px solid #555', // bordo grigio scuro
        borderRadius: '6px',
        padding: '10px 20px',
        backgroundColor: '#eee',  // sfondo chiaro
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <ComponenteSedute
        testo="Seduta del 01/01/2024"
        bottone={<InfoButton onClick={handleClick} />}
      />
    </div>
  );
}

export default ContenitoreSedute;
