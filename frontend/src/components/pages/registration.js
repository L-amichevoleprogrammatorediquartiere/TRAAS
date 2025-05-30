import { useState } from 'react';
import Scritta from '../scritta';

export default function RegistrationPage() {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleLoginClick = () => {
    console.log('Accedi cliccato');
  };

  const isMedico = selectedRole === 'Medico';

  const roleContainerStyle = {
    position: 'absolute',
    top: '5%',
    left: '10%',
    display: 'flex',
    flexDirection: 'row',
    gap: '40px',
  };

  const roleBoxStyle = (role) => ({
    width: '20px',
    height: '20px',
    border: '2px solid gray',
    backgroundColor: selectedRole === role ? 'blue' : 'white',
    cursor: 'pointer',
    display: 'inline-block',
    marginRight: '5px',
  });

  return (
    <>
      <div style={{ position: 'absolute', width: '100%', height: '100%' }}>

        <h2 style={{ position: 'absolute', top: '5%', left: '18%' }}>Registrazione</h2>

        {/* Selettore Paziente */}
        <div
          style={{
            position: 'absolute',
            top: '13%',
            left: '18%',
            display: 'flex',
            alignItems: 'center',
            fontSize: '18px', // Puoi modificare la dimensione del font qui
            cursor: 'pointer',
          }}
          onClick={() => handleRoleSelect('Paziente')}
        >
          <div style={roleBoxStyle('Paziente')} />
          <span style={{ marginLeft: '10px' }}>Paziente</span>
        </div>

        {/* Selettore Medico */}
        <div
          style={{
            position: 'absolute',
            top: '13%',
            left: '30%',
            display: 'flex',
            alignItems: 'center',
            fontSize: '18px', // Anche qui puoi modificare la dimensione
            cursor: 'pointer',
          }}
          onClick={() => handleRoleSelect('Medico')}
        >
          <div style={roleBoxStyle('Medico')} />
          <span style={{ marginLeft: '10px' }}>Medico</span>
        </div>

        {/* Input Professione se Medico */}
        {isMedico && (
          <input
            type="text"
            placeholder="Professione"
            style={{
              position: 'absolute',
              top: '12.5%',
              left: '40%',
              width: '30%',
              padding: '5px',
              width: '20%'
            }}
          />
        )}

        {/* Codice Fiscale */}
        <input
          type="text"
          placeholder="Codice Fiscale"
          style={{ position: 'absolute', top: '20%', left: '18%', width: '30%', padding: '5px' }}
        />

        {/* Nome */}
        <input
          type="text"
          placeholder="Nome"
          style={{ position: 'absolute', top: '27%', left: '18%', width: '30%', padding: '5px' }}
        />

        {/* Cognome */}
        <input
          type="text"
          placeholder="Cognome"
          style={{ position: 'absolute', top: '34%', left: '18%', width: '30%', padding: '5px' }}
        />

        {/* Data di nascita in riga */}
        <div
          style={{
            position: 'absolute',
            top: '41.5%',
            left: '18%',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '16px',
          }}
        >
          <label htmlFor="birthDate">Data di nascita:</label>
          <input id="birthDate" type="date" style={{ padding: '5px' }} />
        </div>

        {/* Genere */}
        <div style={{ position: 'absolute', top: '48.5%', left: '18%' }}>
          <span style={{ marginRight: '5px' }}>Genere:</span>
          <label>
            <input type="radio" name="gender" value="M" /> M
          </label>
          <label style={{ marginLeft: '20px' }}>
            <input type="radio" name="gender" value="F" /> F
          </label>
        </div>

        {/* Email */}
        <input
          type="email"
          placeholder="E-mail"
          style={{ position: 'absolute', top: '55%', left: '18%', width: '30%', padding: '5px' }}
        />

        {/* Telefono */}
        <input
          type="tel"
          placeholder="Telefono"
          style={{ position: 'absolute', top: '62%', left: '18%', width: '30%', padding: '5px' }}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          style={{ position: 'absolute', top: '69%', left: '18%', width: '30%', padding: '5px' }}
        />

        {/* Conferma Password */}
        <input
          type="password"
          placeholder="Conferma password"
          style={{ position: 'absolute', top: '76%', left: '18%', width: '30%', padding: '5px' }}
        />

        {/* Hai già un account? */}
        <p style={{ position: 'absolute', top: '87%', left: '28%' }}>
          Hai già un account?{' '}
          <span
            style={{ fontWeight: 'bold', cursor: 'pointer' }}
            onClick={handleLoginClick}
          >
            Accedi
          </span>
        </p>

        {/* Bottone Registrati */}
        <button
          style={{
            position: 'absolute',
            top: '86%',
            left: '50%',
            padding: '8px 24px',
            fontSize: '16px',
          }}
        >
          Registrati
        </button>
      </div>
      <Scritta/>
    </>
  );
}