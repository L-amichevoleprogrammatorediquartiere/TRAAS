import GrayTable from "../graytable";
import Navbar from "../navbar";
import { useEffect, useState } from 'react';
import LogOutButton from '../button/logoutbutton';
import CloseButton from '../button/closebutton';
import ModifyButton from '../button/modifybutton';
import PlusButton from '../button/plusbutton';

import { getInfoUser } from "../../backend";


export default function ProfiloPage() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
      getInfoUser()
        .then(data => setUserData(data))
        .catch(err => console.error(err));
    }, []);

    if (!userData) return <div>Caricamento...</div>;

    return (
      <>
        <Navbar/>
        <GrayTable/>
        <div style={{ position: 'relative', width: '100%', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
          
          {/* HEADER */}
          <div style={{ position: 'absolute', top: '20%', left: '7%', fontSize: '150%', fontWeight: 'bold' }}>
            Profilo
          </div>
          <div style={{ position: 'absolute', top: '20%', right: '10%', display: 'flex', gap: '15%' }}>
            <LogOutButton />
            <CloseButton />
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
            <div><b>Nome:</b> {userData.nome}</div>
            <div><b>Cognome:</b> {userData.cognome}</div>
            <div><b>Data di nascita:</b> {userData.dataNascita}</div>
            <div><b>Genere:</b> {userData.genere}</div>
            <div><b>Numero di telefono:</b> {userData.numeroTelefono}</div>
            <div><b>Email:</b> {userData.email}</div>

            <div style={{ position: 'absolute', bottom: '2%', right: '2%' }}>
              <ModifyButton />
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
              src={userData.immagine}
              alt="Profilo"
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', bottom: '2%', right: '2%' }}>
              <PlusButton />
            </div>
          </div>
        </div>
      </>
    );
};