function ComponenteSedutePaziente({ testo, valutazione, bottone }) {
  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col">
          <p>{testo}</p>
        </div>
        <div className="col text-end">
          <p>{valutazione}</p>
        </div>
        <div className="col-auto">
          {bottone}
        </div>
      </div>
    </div>
  );
}

function ComponenteSeduteMedico({ testo, codice_fiscale, valutazione, bottone }) {
  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col">
          <p>{testo}</p>
        </div>
        <div className="col">
          <p>{codice_fiscale}</p>
        </div>
        <div className="col text-end">
          <p>{valutazione}</p>
        </div>
        <div className="col-auto">
          {bottone}
        </div>
      </div>
    </div>
  );
}

export { ComponenteSedutePaziente, ComponenteSeduteMedico };
/*controllare import per il medico e la chiamata al medico se funziona e aggiungere nell'altro file quando 
si chiama la funzione medico la variabile codice fiscale che poi ci passerà il back end */