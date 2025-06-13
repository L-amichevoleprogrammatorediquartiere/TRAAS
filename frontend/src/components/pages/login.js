import Scritta from '../scritta.js'

export default function LoginPage() {
  
  const handleRegisterClick = () => {
    // Qui andrai a definire la logica per la registrazione
    console.log('Registrati cliccato');
  };

  return (
    <>
      <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
        {/* Scritta Accedi */}
        <h2 style={{ position: 'absolute', top: '20%', left: '25%' }}>Accedi</h2>

        {/* Input Codice Fiscale */}
        <input
          type="text"
          placeholder="Codice fiscale"
          style={{ position: 'absolute', top: '33%', left: '25%', width: '250px', padding: '8px' }}
        />

        {/* Input Password */}
        <input
          type="password"
          placeholder="Password"
          style={{ position: 'absolute', top: '46%', left: '25%', width: '250px', padding: '8px' }}
        />

        {/* Scritta Registrati */}
        <p style={{ position: 'absolute', top: '60%', left: '17%' }}>
          Non hai un account?{' '}
          <span
            style={{ fontWeight: 'bold', cursor: 'pointer' }}
            onClick={handleRegisterClick}
          >
            Registrati
          </span>
        </p>

        {/* Bottone Avanti */}
        <button
          style={{
            position: 'absolute',
            top: '58%',
            left: '36.2%',
            padding: '10px 20px',
            fontSize: '14px',
          }}
        >
          Avanti
        </button>

        
      </div>
      <Scritta/>
    </>
  );
}