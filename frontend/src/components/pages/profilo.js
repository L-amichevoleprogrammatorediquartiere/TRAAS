import GrayTable from "../graytable";
import Navbar from "../navbar";
import { useEffect, useState, useRef } from 'react';
import LogOutButton from '../button/logoutbutton';
import CloseButton from '../button/closebutton';
import ModifyButton from '../button/modifybutton';
import PlusButton from '../button/plusbutton';

import { getInfoUser,updateUser } from "../../backend";
import PopUpBig from "../popup/ppbig";
import CheckButton from "../button/checkbutton";


export default function ProfiloPage({setView, view}) {
  const [userData, setUserData] = useState(null);

  const [ppOn, setPpOn] = useState(false);
    
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    dataNascita: '',
    genere: '',
    email: '',
    numeroTelefono: '',
    immagine: null,
  });
    
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const [preview,setPreview]=useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      setFormData(prev => ({
      ...prev,
      immagine: file,
      }));
    }
  };

  useEffect(() => {
    getInfoUser()
      .then(data => setUserData(data))
      .catch(err => console.error(err));
  }, []);

  if (!userData) return <div>Caricamento...</div>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const createFormData = (data) => {
    const fd = new FormData();

    // mappatura dei nomi da frontend a backend
    fd.append('nome', data.nome);
    fd.append('cognome', data.cognome);
    fd.append('data_di_nascita', data.dataNascita);
    fd.append('genere', data.genere);
    fd.append('email', data.email);
    fd.append('telefono', data.numerTelefono);

    if (data.immagine) {
      fd.append('immagine', data.immagine);
    }

    return fd;
  }

  return (
    <>
    <GrayTable/>
      <div style={{ position: 'relative', width: '100%', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
        
        {/* HEADER */}
        <div style={{ position: 'absolute', top: '20%', left: '7%', fontSize: '150%', fontWeight: 'bold' }}>
          Profilo
        </div>
        <div style={{ position: 'absolute', top: '20%', right: '9.5%', display: 'flex', gap: '15%' }}>
          {(formData.immagine!=null || formData.nome!=='' || formData.cognome!=='' || 
            formData.dataNascita!=='' || formData.genere!=='' || 
            formData.email!=='' || formData.numeroTelefono!=='' ) &&
            <>
              <PlusButton onClick={async ()=>{
                const fd = createFormData(formData);
                await updateUser(fd);

                getInfoUser()
                  .then(data => setUserData(data))
                  .catch(err => console.error(err));

                //pulisco i form modificati
                setFormData(() => ({nome: '', cognome: '', dataNascita: '', genere: '', email: '', numeroTelefono: ''}));
              }}/>
              <CloseButton onClick={()=>
                setFormData(() => ({nome: '', cognome: '', dataNascita: '', genere: '', email: '', numeroTelefono: '', immagine: null}))
              }/>

            </>}
          <LogOutButton onClick={()=>{localStorage.removeItem('accessToken'); 
                                      localStorage.removeItem('refreshToken');
                                      setView('login');}}/>
        </div>

        {/* DIV INFORMAZIONI BASE */}
        <div
          style={{
            position: 'absolute',
            top: '27%',
            left: '6%',
            width: '55%',
            height: '40%',
            border: '1px solid black',
            borderRadius: '5px',
            padding: '2%',
            boxSizing: 'border-box',
          }}
        >
          <div><b>Nome:</b> {(formData.nome === '')? userData.nome : formData.nome}</div>
          <div><b>Cognome:</b> {(formData.cognome === '')? userData.cognome : formData.cognome}</div>
          <div><b>Data di nascita:</b> {(formData.dataNascita === '')? userData.dataNascita : formData.dataNascita}</div>
          <div><b>Genere:</b> {(formData.genere === '')? userData.genere : formData.genere}</div>
          <div><b>Numero di telefono:</b> {(formData.numeroTelefono === '')? userData.numeroTelefono : formData.numeroTelefono}</div>
          <div><b>Email:</b> {(formData.email === '')? userData.email : formData.email}</div>

          <div style={{ position: 'absolute', bottom: '2%', right: '2%' }}>
            <ModifyButton onClick={()=>setPpOn(true)}/>
            {/*CI MANCA TUTTA LA PARTE DI MODIFICA !!!!!!!!!!!!!!!!!!!!!!!!SIAMO IN RITARDO MUOVERSI */}
          </div>
        </div>

        {/* DIV PATOLOGIA / AREA DA TRATTARE */}
        {userData.patologia && userData.patologia.trim() !== '' && (
          <div
            style={{
            position: 'absolute',
            top: '70%',
            left: '6%',
            width: '55%',
            height: '20%',
            border: '1px solid black',
            borderRadius: '5px',
            padding: '2%',
            boxSizing: 'border-box',
          }}>
            <div><strong>Patologia o area da trattare:</strong></div>
            <div>{userData.patologia || 'Nessuna informazione disponibile'}</div>
          </div>
        )}

        {/* DIV IMMAGINE */}
        <div
          style={{
            position: 'absolute',
            top: '27%',
            right: '9.2%',
            width: '22%',
            height: '40%',
            border: '1px solid black',
            borderRadius: '5px',
            boxSizing: 'border-box',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            src= {(formData.immagine == null)? `http://localhost:8000${userData.immagine}` : preview}
            alt="Profilo"
            style={{width: '100%', maxHeight: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', bottom: '2%', right: '2%' }}>
            <PlusButton onClick={handleImageClick}/>
          </div>

          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
      </div>
      <Navbar setView={setView} view={view} />

      {ppOn &&
        <>
          <PopUpBig onClick={()=> {setPpOn(false); setFormData(() => ({nome: '', cognome: '', dataNascita: '', genere: '', email: '', numeroTelefono: '',}));}} 
          onInnerClick={()=> {setPpOn(false); setFormData(() => ({nome: '', cognome: '', dataNascita: '', genere: '', email: '', numeroTelefono: '',}));}} />
            <input
              name="nome"
              type="text"
              placeholder={userData.nome}
              value={formData.nome}
              onChange={handleChange}
              style={{ position: 'absolute', top: '29%', left: '18%', width: '30%', padding: '5px' }}
            />

            <input
              name="cognome"
              type="text"
              placeholder={userData.cognome}
              value={formData.cognome}
              onChange={handleChange}
              style={{ position: 'absolute', top: '37%', left: '18%', width: '30%', padding: '5px' }}
            />

            <div style={{ position: 'absolute', top: '46%', left: '18%', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <label>Data di nascita:</label>
              <input
                name="nascita"
                type="date"
                value={formData.dataNascita}
                onChange={handleChange}
                style={{ padding: '5px' }}
              />
            </div>

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

            <input
              name="email"
              type="email"
              placeholder={userData.email}
              value={formData.email}
              onChange={handleChange}
              style={{ position: 'absolute', top: '60%', left: '18%', width: '30%', padding: '5px' }}
            />

            <input
              name="telefono"
              type="tel"
              placeholder={userData.numeroTelefono}
              value={formData.numeroTelefono}
              onChange={handleChange}
              style={{ position: 'absolute', top: '68%', left: '18%', width: '30%', padding: '5px' }}
            />
          {(formData.nome!=='' || formData.cognome!=='' || 
            formData.dataNascita!=='' || formData.genere!=='' || 
            formData.email!=='' || formData.numeroTelefono!=='' ) &&
              <div style={{ position: 'absolute', top: '81.5%', right: '22.5%'}}>
                <CheckButton onClick={()=>setPpOn(false)}/>
              </div>
            }
        </>
      }
    </>
  );
};