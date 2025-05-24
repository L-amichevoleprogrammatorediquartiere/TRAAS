export default function LogoutButton({ onClick }) {
    return (
      <button onClick={onClick} className="btn btn-outline-danger rounded-0">
        <i className="bi bi-box-arrow-right"></i>
      </button>
    );
  }
  