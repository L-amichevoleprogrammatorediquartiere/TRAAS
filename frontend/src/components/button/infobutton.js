export default function InfoButton({ onClick }) {
    return (
      <button onClick={onClick} className="btn btn-info rounded-circle">
        <i className="bi bi-info-lg"></i>
      </button>
    );
  }
  