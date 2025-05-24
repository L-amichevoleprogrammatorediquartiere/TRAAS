export default function DeleteButton({ onClick }) {
    return (
      <button onClick={onClick} className="btn btn-outline-danger rounded-0 ">
        <i className="bi bi-trash"></i>
      </button>
    );
  }
  