export default function SearchButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="btn btn-outline-dark rounded-5 d-flex align-items-center justify-content-center custom-grey-button"
      style={{ width: '45px', height: '45px', padding: 0 }}
    >
      <i className="bi bi-search fs-5"></i>
    </button>
  );
}
