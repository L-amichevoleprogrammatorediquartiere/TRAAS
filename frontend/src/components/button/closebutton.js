export default function CloseButton({ onClick }) {
    return (
      <button onClick={onClick} className="btn btn-dark rounded-circle">
        <i className="bi bi-x-lg"></i>
      </button>
    );
  }
  