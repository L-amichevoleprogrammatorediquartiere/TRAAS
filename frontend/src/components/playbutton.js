function PlayButton({onClick}){
    return(
        <button
            onClick={onClick}
            className="btn btn-danger rounded-circle d-flex align-items-center justify-content-center"
            style={{
                width: '60px',
                height: '60px',
                padding: '0',
                border: 'none',
            }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="white" className="bi bi-play-fill" viewBox="0 0 16 16">
                <path d="M11.596 8.697l-6.363 3.692A.5.5 0 0 1 4.5 12V4a.5.5 0 0 1 .733-.442l6.363 3.692a.5.5 0 0 1 0 .846z"/>
            </svg>
        </button>
    );
}

export default PlayButton;