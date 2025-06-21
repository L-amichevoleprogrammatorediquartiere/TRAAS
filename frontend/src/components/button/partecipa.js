export default function PartecipaButton({ onClick }) {
  return (
    <button onClick={onClick} className="btn btn-danger rounded-pill px-4 fw-bold">
      Partecipa
    </button>
  );
}