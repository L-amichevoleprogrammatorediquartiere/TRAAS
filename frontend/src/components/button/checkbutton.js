export default function CheckButton({ onClick }) {
    return (
      <button onClick={onClick} className="btn btn-outline-success rounded-0">
        <i className="bi bi-check-lg"></i>
      </button>
    );
  }
  