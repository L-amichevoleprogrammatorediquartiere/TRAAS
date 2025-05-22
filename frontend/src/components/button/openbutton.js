export default function OpenButton({ onClick }) {
    return (
      <button onClick={onClick} className="btn btn-primary rounded-circle">
        <i className="bi bi-arrow-right"></i>
      </button>
    );
  }
  