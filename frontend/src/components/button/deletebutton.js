export default function DeleteButton({ onClick }) {
    return (
      <button onClick={onClick} className="btn btn-danger rounded-circle">
        <i className="bi bi-trash"></i>
      </button>
    );
  }
  