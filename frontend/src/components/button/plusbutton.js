export default function PlusButton({ onClick }) {
    return (
      <button onClick={onClick} className="btn btn-success rounded-0">
        <i className="bi bi-plus"></i>
      </button>
    );
  }
  