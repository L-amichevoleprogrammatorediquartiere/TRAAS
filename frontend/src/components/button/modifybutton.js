export default function EditButton({ onClick }) {
    return (
      <button onClick={onClick} className="btn btn-outline-dark rounded-0 custom-grey-button">
        <i className="bi bi-pencil"></i>
      </button>
    );
  }
  