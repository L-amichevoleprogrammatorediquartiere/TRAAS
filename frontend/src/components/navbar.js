import { useEffect, useState } from 'react';

import { GetUserRole } from '../backend';
import { GetMedici } from '../backend';

function Navbar() {
  const [role, setRole] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [medici, setMedici] = useState([]);

  useEffect(() => {
    GetUserRole().then(setRole);
  }, []);

  function handleMediciClick() {
    if (!showDropdown) {
      GetMedici().then(setMedici);
    }
    setShowDropdown(!showDropdown);
  }

  function handleClick(label) {
    if (role === 'paziente' && label === 'I tuoi medici') return;
    console.log(`Navigazione verso ${label}`);
  }

  if (!role) return null;

  const buttons = role === 'paziente'
    ? ['Le tue sedute', '', 'TRAAS', 'I tuoi medici', 'Profilo']
    : ['Sedute', 'Libreria esercizi', 'TRAAS', 'I tuoi pazienti', 'Profilo'];

  return (
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
                zIndex: 1
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
                    onClick={() => console.log(`Hai cliccato su ${medico.nome} ${medico.cognome}`)}
                  >
                    <img src={medico.immagine} alt={`${medico.nome}`} style={{ width: '25%', height: 'auto' }} />
                    <div style={{ textAlign: 'left', marginLeft: '2%' }}>
                      <div>{medico.nome} {medico.cognome}</div>
                      <div>{medico.professione}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Navbar;
