import { useState, useRef, useEffect, useCallback } from 'react';
import { renderMessages } from "./rendermessage";
import SendButton from '../button/sendbutton';
import { inviaMessaggio } from '../../backend';

export default function ChatBig({profilePic, profile, codiceFiscale}) {
    
    //devi mettere che qua viene solo passato il codice fiscale tutte le info
    //se le recuperasse lui sennò che dobbiamo passare un bordello

    const containerRef = useRef(null);
    const [limit, setLimit] = useState(10);
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');
    
    const loadMessages = useCallback(async () => {
        const container = containerRef.current;
        if (!container) return;

        // Salva la distanza dal fondo
        const scrollFromBottom = container.scrollHeight - container.scrollTop;

        if (limit - messages.length <= 10) {
            const { rendered } = await renderMessages(limit, codiceFiscale);
            setMessages(rendered);
        }

        // Ripristina la posizione scroll dopo il render
        setTimeout(() => {
            if (!container) return;
            container.scrollTop = container.scrollHeight - scrollFromBottom;
        }, 0);
    }, [limit, messages.length, codiceFiscale]);

  // useEffect chiama loadMessages quando cambia limit
  useEffect(() => {
    loadMessages();
  }, [limit, loadMessages]);

    useEffect(() => {
        const container = containerRef.current;
        const handleScroll = () => {
            if (container.scrollTop*-1 >= container.scrollHeight - container.clientHeight -10) {    //10 pixel di tolleranza
                setLimit(prev => prev + 5); // carica 5 messaggi in più
            }
        };
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    const handleMessage = async () => {
        //controlla se non è vuoto value, manda al server e aggiorna la pagina
        if(value.trim()){
            try {
                const result = await inviaMessaggio(codiceFiscale, value);
                loadMessages();
                console.log(result);
            }catch (error) {
                console.error(error);
            }
        }
        setValue('');
    };

    return (
        <>
            <div
                className="position-absolute rounded-0"
                style={{
                    top: '19%',
                    left: '14%',
                    width: '70%',
                    height: '60%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    pointerEvents: 'auto',
                    backgroundColor: 'var(--bg-chat)', 
                    border: '1px solid #212529', // bordo scuro, per coerenza
                    padding: '20px',
                }}>
                <div
                    ref={containerRef}
                    className="position-absolute rounded-0"
                    style={{
                        top: '0%',
                        left: '0%',
                        width: '100%',
                        height: '100%',
                        overflow: 'auto',
                        display: 'flex',              // flex container
                        flexDirection: 'column-reverse', // messaggi dal basso verso l’alto
                        justifyContent: 'flex-start', // parte dal fondo, poi sale
                        padding: '10px',
                        boxSizing: 'border-box',
                    }}>
                        {messages}
                    </div>
            </div>

            <div
                style = {{
                    position: 'absolute',
                    top: '81%',
                    left: '58%',
                }}>
                <SendButton
                    onClick={handleMessage}/>
            </div>

            <div style={{
                position: 'absolute',
                top: '79.65%',
                left: '22%',
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                width: '35%',
            }}>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Messaggio..."
                    style={{
                        flex: 1,
                        padding: '10px 20px',
                        borderRadius: '999px', // massima rotondità
                        border: '1px solid #ccc',
                        outline: 'none',
                        fontSize: '14px',
                        fontFamily: 'var(--carattere-txt)',
                        height: '5%',
                    }}
            
                />
            </div>

            <img
                src={`http://localhost:8000${profilePic}`}
                alt="pfp"
                style={{ 
                    position: 'absolute',
                    top: '10.5%',
                    left: '20%',
                    width: '4%',
                    height: '8%', 
                    border: '1.5px solid', 
                }}
            />
            <p style={{ 
                marginTop: '8px',
                position: 'absolute',
                top: '11.5%',
                left: '27%',
                fontSize: '16px',
                fontFamily: 'var(--carattere-txt)',
            }}
            >{profile}</p>
        </>
    );
  }