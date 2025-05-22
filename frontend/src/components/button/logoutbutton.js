export default function LogoutButton({ onClick }) {
    return (
      <button onClick={onClick} className="btn btn-outline-danger rounded-circle">
        <i className="bi bi-box-arrow-right"></i>
      </button>
    );
  }
  