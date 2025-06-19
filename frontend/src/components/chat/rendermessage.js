import MsgSx from "./msg/msgsx";
import MsgDx from "./msg/msgdx";
import { getMessages } from "../../backend"; 

export const renderMessages = async ( limit = 10,codiceFiscale) => {
    //const messages = mockAllMessages.reverse().slice(-limit).reverse(); // prendi solo gli ultimi `limit` messaggi
    
    //RICORDATI CHE A GETMESSAGES GLI DEVI PASSARE ANCHE CF DESTINATARIO
    const messages = await getMessages(limit, codiceFiscale);
    console.log(messages);


    let rendered = [];
    let lastDate = messages.length > 0 ? new Date(messages[0].timestamp).toDateString() : null;
    let lastId = null;

    for (const msg of messages) {
        const msgDate = new Date(msg.timestamp).toDateString();
        const time = new Date(msg.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });

        if (msgDate !== lastDate) {
            rendered.push(<DateSeparator key={`date-${msg.id}`} date={lastDate} />);
            lastDate = msgDate;
        }

        if (msg.sender === 'me') {
            rendered.push(<MsgDx key={msg.id} text={msg.text} time={time} />);
        } else {
            rendered.push(<MsgSx key={msg.id} text={msg.text} time={time} />);
        }

        lastId = msg.id;
    }

    // Date separator finale
    if (messages.length > 0 && lastId) {
        rendered.push(<DateSeparator key={`date-${lastId}`} date={lastDate} />);
    }

    return { rendered, lastId };
};

const DateSeparator = ({ date }) => {
    return (
        <div style={{
            textAlign: 'center',
            margin: '10px 0',
            color: '#000000',
            fontSize: '0.85rem',
        }}>
            {date}
        </div>
    );
};