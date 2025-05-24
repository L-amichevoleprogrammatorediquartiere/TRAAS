export default function ExpandButton({ onClick }) {
    return (
      <button
        onClick={onClick}
        className="btn btn-outline-dark rounded-0 d-flex align-items-center justify-content-center custom-grey-button"
        style={{ width: '42px', height: '40px', padding: 0 }}
      >
        <i className="bi bi-arrows-fullscreen fs-5"></i>
      </button>
    );
  }
  