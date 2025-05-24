const MedicoCard = ({ nome, descrizione, ultimaModifica, imgSrc, onClick }) => {
  return (
    <div
      className="card mb-3"
      style={{ maxWidth: '540px', cursor: 'pointer' }}
      onClick={onClick}
    >
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={imgSrc}
            className="img-fluid rounded-start"
            alt={`Foto di ${nome}`}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{nome}</h5>
            <p className="card-text">{descrizione}</p>
            <p className="card-text">
              <small className="text-body-secondary">{ultimaModifica}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicoCard;
