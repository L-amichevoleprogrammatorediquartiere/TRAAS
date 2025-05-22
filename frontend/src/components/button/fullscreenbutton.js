export default function ExpandButton({ onClick }) {
    return (
      <button
        onClick={onClick}
        className="btn btn-outline-primary rounded-circle d-flex align-items-center justify-content-center"
        style={{ width: '48px', height: '48px', padding: 0 }}
      >
        <i className="bi bi-arrows-fullscreen fs-5"></i>
      </button>
    );
  }
  