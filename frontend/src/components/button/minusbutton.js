export default function MinusButton({ onClick }) {
    return (
      <button onClick={onClick} className="btn btn-warning rounded-circle">
        <i className="bi bi-dash"></i>
      </button>
    );
  }
  