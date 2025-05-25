export default function MsgSx({ text, time }){
    return(
        <div
            className="position-relative rounded"
            style={{
                maxWidth: '45%',
                minWidth: '10%',
                display: 'inline-block',
                alignSelf: 'flex-end',
                backgroundColor: '#6BD192',
                border: '1px solid #212529',
                padding: '10px 14px 20px 14px', // spazio in basso per l'orario
                margin: '6px 0',
                position: 'relative',
                wordBreak: 'break-word',
                textAlign: 'right',
            }}
        >
            <p style={{ margin: 0, fontSize: '0.95rem' }}>{text}</p>
            <span
                style={{
                    position: 'absolute',
                    bottom: '4px',
                    right: '8px',
                    fontSize: '0.7rem',
                    color: '#444',
                }}
            >
                {time}
            </span>
        </div>
    );
}