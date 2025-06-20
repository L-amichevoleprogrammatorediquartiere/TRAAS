import { useEffect, useState } from 'react';

import fetchPazientiConMessaggi, { GetUserRole } from '../backend';
import { GetMedici } from '../backend';

import InfoChat from "./popup/infochat";

function Navbar({setView, view}) {
  const [role, setRole] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [medici, setMedici] = useState([]);

  const [popOn, setPopOn] = useState(false);
  const [codiceFiscaleSelezionato, setCodiceFiscaleSelezionato] = useState(null);

  const [pazientiDaLeggere, setPazientiDaLeggere] = useState(false);

  useEffect(() => {
    async function checkMessaggi() {
      const ruolo = await GetUserRole();
      setRole(ruolo);

      if (ruolo !== 'paziente') {
        const messaggi = await fetchPazientiConMessaggi();
        if (messaggi.length > 0) {
          setPazientiDaLeggere(true);
        }
      }
    }

    checkMessaggi();
  }, []);

  async function handleMediciClick() {
    if (!showDropdown) {
      GetMedici().then(setMedici);
    }
    setShowDropdown(!showDropdown);
  }

  function handleClick(label) {
    if (role === 'paziente' && label === 'I tuoi medici') return;
    console.log(`Navigazione verso ${label}`);
    switch(label){
      case 'I tuoi pazienti':
        if (view!== 'pazienti'){
          setView('pazienti')
        }
        break;
      case 'Profilo':
        if (view!== 'profilo'){
          setView('profilo')
        }
        break;
      case 'Libreria esercizi':
        if (view!== 'esercizi'){
          setView('esercizi')
        }
        break;
      case 'Le tue sedute':
        if (view!== 'sedute'){
          setView('sedute')
        }
        break;
      case 'Sedute':
        if (view!== 'sedute'){
          setView('sedute')
        }
        break;
    }
  }

  if (!role) return null;

  const buttons = role === 'paziente'
    ? ['Le tue sedute', '', 'TRAAS', 'I tuoi medici', 'Profilo']
    : ['Sedute', 'Libreria esercizi', 'TRAAS', 'I tuoi pazienti', 'Profilo'];

  return (
    <>
      <div style={{
        position: 'absolute',
        top: '5%',
        left: '3.5%',
        width: '92%',
        height: '6%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '0px solid black',
        backgroundColor: '#ffffff'
      }}>
        {buttons.map((label, idx) => {
          if (label === 'TRAAS') {
            return (
              <div key={idx} style={{
                width: '18%',
                height: '100%',
                display: 'flex',             // <--- Abilita Flexbox
                alignItems: 'center',        // <--- Centra verticalmente
                justifyContent: 'center',    // <--- Centra orizzontalmente
                fontWeight: 'bold',
                fontSize: '180%',
                border: '0.5px solid black',
                textAlign: 'center'
              }}>
                <i>{label}</i>
              </div>
            );
          }

          return (
            <div key={idx} style={{ width: '21.5%',height: '100%', textAlign: 'center', position: 'relative' }}>
              <button
                onClick={() => {
                  if (role === 'paziente' && label === 'I tuoi medici') {
                    handleMediciClick();
                  } else {
                    handleClick(label);
                  }
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  border: '1px solid black',
                  backgroundColor: '#ffffff',
                  cursor: 'pointer'
                }}
              >
                {label || ''}
              </button>

              {label === 'I tuoi medici' && showDropdown && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: '-10%',
                  width: '120%',
                  backgroundColor: '#ffffff',
                }}>
                  {medici.map((medico, i) => (
                    <button
                      key={i}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5%',
                        border: '1px solid black',
                        borderBottom: '0.1% solid gray',
                        padding: '2%',
                        backgroundColor: '#fff',
                        cursor: 'pointer'
                      }}
                      onClick={() => {setPopOn(true);setCodiceFiscaleSelezionato(medico.codiceFiscale);}}
                    >
                      <img src={`http://localhost:8000${medico.immagine}`} alt={`${medico.nome}`} style={{ width: '20%',  border: "1px solid black" }} />
                      <div style={{ textAlign: 'left', marginLeft: '2%' }}>
                        <div>{medico.nome} {medico.cognome}</div>
                        <div>{medico.specializzazione}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {popOn && 
        <InfoChat setPopOn={setPopOn} codiceFiscaleSelezionato={codiceFiscaleSelezionato}/>
      }
      {pazientiDaLeggere &&
        <div
        style={{
            position: 'absolute',  
            width: '1.2%',
            height: '2.5%',
            top:'6.8%',
            left: '37%',
            borderRadius: '50%',
            backgroundColor: 'var(--bs-primary)',
            marginLeft: '24%',
        }}></div>   
      }
    </>
  );
}

export default Navbar;
