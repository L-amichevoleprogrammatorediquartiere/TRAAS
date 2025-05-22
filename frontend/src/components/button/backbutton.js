export default function BackButton({ onClick }) {
    return (
      <button onClick={onClick} className="btn btn-secondary rounded-circle">
        <i className="bi bi-arrow-left"></i>
      </button>
    );
  }
  