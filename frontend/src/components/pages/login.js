import { useState } from 'react';
import Scritta from '../scritta.js';
import {login} from '../../backend.js';

export default function LoginPage({ setView }) {
  const [formData, setFormData] = useState({
    codiceFiscale: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleRegisterClick = () => {
    setView("registration");
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });

    // Rimuove l'errore appena si modifica il campo
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const handleSubmit = async () => {
    const newErrors = {};
    if (!formData.codiceFiscale) {
      newErrors.codiceFiscale = "Il codice fiscale è obbligatorio.";
    }
    if (!formData.password) {
      newErrors.password = "La password è obbligatoria.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await login(formData.codiceFiscale, formData.password);
      console.log("Login effettuato con successo");
      
      setView("home");

    }catch (err) {
      setErrors({ general: err.message });
    }
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
          value={formData.codiceFiscale}
          onChange={(e) => handleChange('codiceFiscale', e.target.value)}
          style={{
            position: 'absolute',
            top: '33%',
            left: '25%',
            width: '250px',
            padding: '8px',
            border: '1px solid gray',
          }}
        />
        {errors.codiceFiscale && (
          <span style={{ color: 'red', position: 'absolute', top: '39%', left: '25%', fontSize:'80%' }}>
            {errors.codiceFiscale}
          </span>
        )}

        {/* Input Password */}
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => handleChange('password', e.target.value)}
          style={{
            position: 'absolute',
            top: '46%',
            left: '25%',
            width: '250px',
            padding: '8px',
            border: '1px solid gray',
          }}
        />
        {errors.password && (
          <span style={{ color: 'red', position: 'absolute', top: '52%', left: '25%', fontSize:'80%' }}>
            {errors.password}
          </span>
        )}

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
          onClick={handleSubmit}
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
      <Scritta />
    </>
  );
}
