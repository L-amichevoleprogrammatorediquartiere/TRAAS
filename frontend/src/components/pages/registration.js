import { useState } from 'react';
import Scritta from '../scritta';
import { registerUser } from '../../backend';

export default function RegistrationPage({ setView }) {
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({
    ruolo: null,
    professione: '',
    codiceFiscale: '',
    nome: '',
    cognome: '',
    nascita: '',
    genere: '',
    email: '',
    telefono: '',
    password: '',
    confermaPassword: '',
    immagine: null,
  });

  const [errors, setErrors] = useState({});

  const isMedico = selectedRole === 'Medico';

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setFormData({ ...formData, ruolo: role });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.ruolo) newErrors.ruolo = 'Seleziona un ruolo.';
    if (formData.ruolo === 'Medico' && !formData.professione.trim())
      newErrors.professione = 'Inserisci la professione.';
    if (!formData.codiceFiscale.trim()) newErrors.codiceFiscale = 'Codice fiscale obbligatorio.';
    if (!formData.nome.trim()) newErrors.nome = 'Nome obbligatorio.';
    if (!formData.cognome.trim()) newErrors.cognome = 'Cognome obbligatorio.';
    if (!formData.nascita) newErrors.nascita = 'Data di nascita obbligatoria.';
    if (!formData.genere) newErrors.genere = 'Seleziona un genere.';
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Email non valida.';
    if (!formData.telefono.trim()) newErrors.telefono = 'Telefono obbligatorio.';
    if (!formData.password) newErrors.password = 'Password obbligatoria.';
    if (formData.password !== formData.confermaPassword)
      newErrors.confermaPassword = 'Le password non coincidono.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    // Qui potresti inviare i dati al backend
    const fd = createFormData(formData);
    await registerUser(fd);
    setView('login');
  };

  const errorStyle = {
    color: 'red',
    fontSize: '12px',
    position: 'absolute',
    left: '18%',
  };

  //qua metterò tutto ciò che serve per l'immagine profilo
  const [preview, setPreview] = useState(null);

  const createFormData = (data) => {
    const fd = new FormData();

    // mappatura dei nomi da frontend a backend
    fd.append('ruolo', data.ruolo);  // se serve nel backend
    fd.append('specializzazione', data.professione);  // solo per medico
    fd.append('codice_fiscale', data.codiceFiscale);
    fd.append('nome', data.nome);
    fd.append('cognome', data.cognome);
    fd.append('data_di_nascita', data.nascita);
    fd.append('genere', data.genere);
    fd.append('email', data.email);
    fd.append('telefono', data.telefono);
    fd.append('password', data.password);

    if (data.immagine) {
      fd.append('immagine', data.immagine);
    }

    return fd;
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Crea un URL temporaneo per l'anteprima
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      setFormData(prev => ({
      ...prev,
      immagine: file,
    }));
    }
  };

  return (
    <>
      <div style={{ position: 'absolute', width: '100%', height: '100%' }}>

        <h2 style={{ position: 'absolute', top: '4%', left: '18%' }}>Registrazione</h2>

        {/* Ruolo */}
        <div style={{ position: 'absolute', top: '13%', left: '18%', display: 'flex', alignItems: 'center' }}>
          <div onClick={() => handleRoleSelect('Paziente')} style={{ cursor: 'pointer' }}>
            <div style={{
              width: '20px',
              height: '20px',
              border: '2px solid gray',
              backgroundColor: selectedRole === 'Paziente' ? 'blue' : 'white',
              display: 'inline-block',
              marginRight: '5px'
            }} />
            <span style={{ marginRight: '20px' }}>Paziente</span>
          </div>

          <div onClick={() => handleRoleSelect('Medico')} style={{ cursor: 'pointer' }}>
            <div style={{
              width: '20px',
              height: '20px',
              border: '2px solid gray',
              backgroundColor: selectedRole === 'Medico' ? 'blue' : 'white',
              display: 'inline-block',
              marginRight: '5px'
            }} />
            <span>Medico</span>
          </div>
        </div>
        {errors.ruolo && <div style={{ ...errorStyle,position:'absolute', top: '10%', left:"18%" }}>{errors.ruolo}</div>}

        {isMedico && (
          <>
            <input
              name="professione"
              type="text"
              placeholder="Professione"
              value={formData.professione}
              onChange={handleChange}
              style={{ position: 'absolute', top: '12%', left: '35%', width: '20%', padding: '5px' }}
            />
            {errors.professione && <div style={{ ...errorStyle, position:"absolute", top: '9%', left: '35%' }}>{errors.professione}</div>}
          </>
        )}

        {/* Altri campi */}
        <input
          name="codiceFiscale"
          type="text"
          placeholder="Codice Fiscale"
          value={formData.codiceFiscale}
          onChange={handleChange}
          style={{ position: 'absolute', top: '21%', left: '18%', width: '30%', padding: '5px' }}
        />
        {errors.codiceFiscale && <div style={{ ...errorStyle,position:"absolute", top: '18%' }}>{errors.codiceFiscale}</div>}

        <input
          name="nome"
          type="text"
          placeholder="Nome"
          value={formData.nome}
          onChange={handleChange}
          style={{ position: 'absolute', top: '29%', left: '18%', width: '30%', padding: '5px' }}
        />
        {errors.nome && <div style={{ ...errorStyle, top: '26.5%' }}>{errors.nome}</div>}

        <input
          name="cognome"
          type="text"
          placeholder="Cognome"
          value={formData.cognome}
          onChange={handleChange}
          style={{ position: 'absolute', top: '37%', left: '18%', width: '30%', padding: '5px' }}
        />
        {errors.cognome && <div style={{ ...errorStyle, top: '34.5%' }}>{errors.cognome}</div>}

        <div style={{ position: 'absolute', top: '46%', left: '18%', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label>Data di nascita:</label>
          <input
            name="nascita"
            type="date"
            value={formData.nascita}
            onChange={handleChange}
            style={{ padding: '5px' }}
          />
        </div>
        {errors.nascita && <div style={{ ...errorStyle, top: '43%' }}>{errors.nascita}</div>}

        <div style={{ position: 'absolute', top: '54%', left: '18%' }}>
          <span>Genere:</span>
          <label style={{ marginLeft: '10px' }}>
            <input type="radio" name="genere" value="M"
              checked={formData.genere === 'M'}
              onChange={handleChange}
            /> M
          </label>
          <label style={{ marginLeft: '20px' }}>
            <input type="radio" name="genere" value="F"
              checked={formData.genere === 'F'}
              onChange={handleChange}
            /> F
          </label>
        </div>
        {errors.genere && <div style={{ ...errorStyle, top: '51.5%' }}>{errors.genere}</div>}

        <input
          name="email"
          type="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleChange}
          style={{ position: 'absolute', top: '60%', left: '18%', width: '30%', padding: '5px' }}
        />
        {errors.email && <div style={{ ...errorStyle, top: '57.2%' }}>{errors.email}</div>}

        <input
          name="telefono"
          type="tel"
          placeholder="Telefono"
          value={formData.telefono}
          onChange={handleChange}
          style={{ position: 'absolute', top: '68%', left: '18%', width: '30%', padding: '5px' }}
        />
        {errors.telefono && <div style={{ ...errorStyle, top: '65.5%' }}>{errors.telefono}</div>}

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={{ position: 'absolute', top: '76%', left: '18%', width: '30%', padding: '5px' }}
        />
        {errors.password && <div style={{ ...errorStyle, top: '73.3%' }}>{errors.password}</div>}

        <input
          name="confermaPassword"
          type="password"
          placeholder="Conferma password"
          value={formData.confermaPassword}
          onChange={handleChange}
          style={{ position: 'absolute', top: '84%', left: '18%', width: '30%', padding: '5px' }}
        />
        {errors.confermaPassword && <div style={{ ...errorStyle, top: '81.3%' }}>{errors.confermaPassword}</div>}


        <div style={{position: 'absolute',
        width: '14%',
        height: '28%',
        top: "18%",
        left: "2%",
        fontSize: '108%',
        border: '1px solid black',
        display: 'flex',
        alignItems: 'center',    // Centra verticalmente
        justifyContent: 'center', // Centra orizzontalmente
        textAlign: 'center',
        backgroundColor:'var(--bg-div-color)'}}>Foto profilo:</div>

        <input type="file" accept="image/*" onChange={handleFileChange}
          style={{position:'absolute', top:"48%", left:"2%"}}/>
        {preview && (
          <div style={{position:'absolute', width: '14%', height: '28%',
          top: '18%', left: '2%', border: '1px solid black' }}>
            <img src={preview} 
            alt="Anteprima foto" 
            style={{ width:'100%', height: '100%' }} />
          </div>
          )}

        {/* Link login */}
        <p style={{ position: 'absolute', top: '92%', left: '28%' }}>
          Hai già un account?{' '}
          <span style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={()=>setView('login')}>
            Accedi
          </span>
        </p>

        {/* Bottone Registrati */}
        <button
          onClick={handleSubmit}
          style={{
            position: 'absolute',
            top: '84%',
            left: '55%',
            padding: '8px 24px',
            fontSize: '16px',
          }}
        >
          Registrati
        </button>
      </div>
      <Scritta />
    </>
  );
}
