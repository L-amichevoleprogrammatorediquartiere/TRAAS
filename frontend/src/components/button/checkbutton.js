export default function CheckButton({ onClick }) {
    return (
      <button onClick={onClick} className="btn btn-success rounded-circle">
        <i className="bi bi-check-lg"></i>
      </button>
    );
  }
  