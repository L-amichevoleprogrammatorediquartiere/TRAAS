export default function MinusButton({ onClick }) {
    return (
      <button onClick={onClick} className="btn btn-outline-danger rounded-0">
        <i className="bi bi-dash"></i>
      </button>
    );
  }
  