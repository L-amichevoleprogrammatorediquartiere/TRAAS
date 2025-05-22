export default function EditButton({ onClick }) {
    return (
      <button onClick={onClick} className="btn btn-warning rounded-circle">
        <i className="bi bi-pencil"></i>
      </button>
    );
  }
  