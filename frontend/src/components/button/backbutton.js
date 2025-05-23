export default function BackButton({ onClick }) {
    return (
      <button onClick={onClick} className="btn btn-outline-dark px-4 py-1 rounded-0 custom-grey-button">
        <i className="bi bi-arrow-left"></i>
      </button>
    );
  }
  