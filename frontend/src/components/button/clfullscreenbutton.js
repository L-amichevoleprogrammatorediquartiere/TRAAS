export default function CollapseButton({ onClick }) {
    return (
      <button
        onClick={onClick}
        className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
        style={{ width: '48px', height: '48px', padding: 0 }}
      >
        <i className="bi bi-fullscreen-exit fs-5"></i>
      </button>
    );
  }
  