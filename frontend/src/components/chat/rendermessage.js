import MsgSx from "./msg/msgsx";
import MsgDx from "./msg/msgdx";

export const renderMessages = async (limit = 10) => {
    // 🔧 MOCK: potresti sostituire questa parte con una fetch in futuro
    const mockAllMessages = [
        { id: 1, text: 'Ultimo messaggio ricevutotesttesttesttesttesttesttesttesttesttesttesttesttesttesttest', sender: 'other', timestamp: '2025-05-25T18:15:00Z' },
        { id: 2, text: 'Hai studiato oggi?testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest', sender: 'me', timestamp: '2025-05-25T18:10:00Z' },
        { id: 3, text: 'Sì, un po\' di React', sender: 'other', timestamp: '2025-05-25T18:05:00Z' },
        { id: 4, text: 'Bravo! Continua così', sender: 'me', timestamp: '2025-05-25T18:00:00Z' },
        { id: 5, text: 'Che fai stasera?', sender: 'me', timestamp: '2025-05-25T17:30:00Z' },
        { id: 6, text: 'Vado al cinema!', sender: 'other', timestamp: '2025-05-25T17:00:00Z' },
        { id: 7, text: 'Poi mi racconti com è andata?', sender: 'me', timestamp: '2025-05-25T16:55:00Z' },
        { id: 8, text: 'Certo!', sender: 'other', timestamp: '2025-05-25T16:50:00Z' },
        { id: 9, text: 'A domani allora!', sender: 'me', timestamp: '2025-05-25T16:45:00Z' },
        { id: 10, text: 'Notte!', sender: 'other', timestamp: '2025-05-25T16:40:00Z' },
            //2025-05-24
        { id: 11, text: 'Oggi è stata una giornata lunga...', sender: 'me', timestamp: '2025-05-24T21:30:00Z' },
        { id: 12, text: 'Già, sono stanchissimo', sender: 'other', timestamp: '2025-05-24T21:25:00Z' },
        { id: 13, text: 'Domani relax!', sender: 'me', timestamp: '2025-05-24T21:20:00Z' },
        { id: 14, text: 'Magari 😅', sender: 'other', timestamp: '2025-05-24T21:15:00Z' },
        { id: 15, text: 'Buonanotte', sender: 'me', timestamp: '2025-05-24T21:10:00Z' },

        { id: 16, text: 'Ci vediamo tra poco', sender: 'other', timestamp: '2025-05-24T16:30:00Z' },
        { id: 17, text: 'Porta i documenti!', sender: 'me', timestamp: '2025-05-24T16:20:00Z' },
        { id: 18, text: 'Sì certo', sender: 'other', timestamp: '2025-05-24T16:10:00Z' },
            //2025-05-23
        { id: 19, text: 'Hai fatto il backup del database?', sender: 'me', timestamp: '2025-05-23T22:00:00Z' },
        { id: 20, text: 'Non ancora 😬', sender: 'other', timestamp: '2025-05-23T21:50:00Z' },
        { id: 21, text: 'Ricordati che è importante!', sender: 'me', timestamp: '2025-05-23T21:45:00Z' },
        { id: 22, text: 'Va bene, lo faccio adesso', sender: 'other', timestamp: '2025-05-23T21:40:00Z' },

        { id: 23, text: 'Ti piace questa nuova UI?', sender: 'me', timestamp: '2025-05-23T14:10:00Z' },
        { id: 24, text: 'Sì molto! È più pulita', sender: 'other', timestamp: '2025-05-23T14:05:00Z' },

        { id: 25, text: 'Perfetto!', sender: 'me', timestamp: '2025-05-23T09:05:00Z' },
        { id: 26, text: 'Tutto bene, grazie!', sender: 'other', timestamp: '2025-05-23T09:00:00Z' },
        { id: 27, text: 'Bene, tu?', sender: 'me', timestamp: '2025-05-23T10:02:00Z' },
            // ricordati che Django i messaggi deve passarli con questa sintassi id: 1, 2 ..... 9, text:, sender: (me o other), timestamp:
    ];

    const messages = mockAllMessages.reverse().slice(-limit).reverse(); // prendi solo gli ultimi `limit` messaggi
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