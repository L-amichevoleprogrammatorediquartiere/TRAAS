import ExpandButton from "../button/fullscreenbutton";
import { useState, useEffect} from 'react';
import { renderMessages } from "./rendermessage";

import ChatBig from "./chatbig";
import PopUpBig from "../popup/ppbig";

import { GetUserRole, RecuperaInfoPaziente, RecuperaInfoMedico } from "../../backend";

export default function ChatSmall({ onClick, codiceFiscale}) {

    const [messages, setRenderedMessages] = useState([]);
    const [isChatbigger, setChatBigger] = useState(false);

    const [img, setImg]= useState(null);
    const [profile, setProfile]= useState('');

    useEffect(() => {
        const loadMessage = async () => {
            const { rendered } = await renderMessages(5,codiceFiscale);
            setRenderedMessages(rendered);
        };

        loadMessage();
        
        async function fetchData() {
            const currentUserRole = await GetUserRole();
        
            if (currentUserRole !== "medico") {
                const data = await RecuperaInfoMedico(codiceFiscale);
                setImg(data.immagine);
                setProfile("Dott. " + data.nome + " " + data.cognome);
            }   
            else {
                const data = await RecuperaInfoPaziente(codiceFiscale);
                setImg(data.immagine);
                setProfile(data.codice_fiscale);
            }
        }

        fetchData();
    }, [codiceFiscale]);

    return (
        <>
            <div
                className="position-absolute rounded-0"
                style={{
                    top: '48%',
                    left: '19%',
                    width: '60%',
                    height: '33%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    pointerEvents: 'auto',
                    backgroundColor: 'var(--bg-chat)', 
                    border: '1px solid #212529', // bordo scuro, per coerenza
                    padding: '20px',
            }}>
                <div
                    className="position-absolute rounded-0"
                    style={{
                        top: '0%',
                        left: '0%',
                        width: '90%',
                        height: '100%',
                        overflow: 'hidden',
                        display: 'flex',              // flex container
                        flexDirection: 'column-reverse', // messaggi dal basso verso l’alto
                        justifyContent: 'flex-start', // parte dal fondo, poi sale
                        padding: '10px',
                        boxSizing: 'border-box',
                    }}>
                        {messages}
                    </div>
                <div
                    style = {{
                        position: 'absolute',
                        top: '75%',
                        left: '93%',
                    }}>
                    <ExpandButton
                        onClick={()=>setChatBigger(true)}/>
                </div>
            </div>
            {isChatbigger && (
                <>
                    <PopUpBig onClick={()=> setChatBigger(false)} onInnerClick={()=> setChatBigger(false)}/>
                    <ChatBig codiceFiscale={codiceFiscale} profilePic={img} profile={profile}/>
                </>
            )}
        </>
    );
  }