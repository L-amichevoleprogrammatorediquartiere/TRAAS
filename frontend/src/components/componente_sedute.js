function ComponenteSedute({ testo, bottone }) {
  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col">
          <p>{testo}</p>
        </div>
        <div className="col-auto">
          {bottone}
        </div>
      </div>
    </div>
  );
}
export default ComponenteSedute;
