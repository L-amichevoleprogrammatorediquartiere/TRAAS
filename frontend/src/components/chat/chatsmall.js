import ExpandButton from "../button/fullscreenbutton";
import { useState, useEffect } from 'react';
import { renderMessages } from "./rendermessage";

export default function ChatSmall({ onClick }) {

    const [messages, setRenderedMessages] = useState([]);

    useEffect(() => {
        const loadMessages = async () => {
            const rendered = await renderMessages(5); // ad esempio 5 messaggi per chat small e 20 per big
            setRenderedMessages(rendered);
        };

        loadMessages();
    }, []);

    return (
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
                    flexDirection: 'column-reverse', // 👈 messaggi dal basso verso l’alto
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
                    onClick={onClick}/>
            </div>
        </div>
    );
  }