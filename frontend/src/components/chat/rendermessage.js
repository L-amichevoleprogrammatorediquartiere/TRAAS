import MsgSx from "./msg/msgsx";
import MsgDx from "./msg/msgdx";

export const renderMessages = async (limit = 10) => {
    // 🔧 MOCK: potresti sostituire questa parte con una fetch in futuro
    const mockAllMessages = [
        { id: 1, text: 'Studio React!', sender: 'me', timestamp: '2025-05-25T08:35:00Z' },
        { id: 2, text: 'Che fai oggi?', sender: 'other', timestamp: '2025-05-25T08:30:00Z' },
        { id: 3, text: 'Perfetto!', sender: 'me', timestamp: '2025-05-24T09:05:00Z' },
        { id: 4, text: 'Tutto bene, grazie! ciao ciao ciao ciao ciao ciao ciao ciao ciao ciao ciao ciao ciao test test test', sender: 'other', timestamp: '2025-05-24T09:00:00Z' },
        { id: 5, text: 'Bene, tu?', sender: 'me', timestamp: '2025-05-23T10:02:00Z' },
        { id: 6, text: 'Ciao, come va?', sender: 'other', timestamp: '2025-05-23T10:01:00Z' },
        { id: 7, text: 'Ciao!', sender: 'me', timestamp: '2025-05-23T10:00:00Z' },
        // ricordati che Django i messaggi deve passarli con questa sintassi id: 1, 2 ..... 9, text:, sender: (me o other), timestamp:
    ];

    const messages = mockAllMessages.slice(-limit); // prendi solo gli ultimi `limit` messaggi
    let lastDate = new Date(messages[0].timestamp).toDateString();
    let lastid = [];
    console.log(messages,lastDate)
    const rendered=[]

    for (const msg of messages) {
        const msgDate = new Date(msg.timestamp).toDateString();

        const time = new Date(msg.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });

        // Se la data è cambiata, inseriamo un DateSeparator
        if (msgDate !== lastDate) {
            console.log("stampato",msgDate)
            rendered.push(<DateSeparator key={`date-${msg.id}`} date={lastDate} />);
            lastDate = msgDate;
        }

        // Poi inseriamo il messaggio, a destra o sinistra
        if (msg.sender === 'me') {
            rendered.push(<MsgDx key={msg.id} text={msg.text} time={time}/>);
        } else {
            rendered.push(<MsgSx key={msg.id} text={msg.text} time={time}/>);
        }
        lastid=msg.id;
    }

    rendered.push(<DateSeparator key={`date-${lastid}`} date={lastDate} />);

    return rendered;
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