export default function VideoSection({ fase }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "7.5px", // spazio ridotto tra i video (~0.2cm)
        flex: "1 1 auto",
        minHeight: 0,
        maxHeight: "50%",
      }}
    >
      <div
        style={{
          flex: 1,
          backgroundColor: "#ccc",
          borderRadius: "6px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 0,
          height: "100%",
          overflow: "hidden",
          fontSize: "0.9rem",
        }}
      >
        {fase === "esercizio" ? (
          <span>Video live Mediapipe (mock)</span>
        ) : (
          <span>Video registrato Mediapipe (mock)</span>
        )}
      </div>

      <div
        style={{
          flex: 1,
          backgroundColor: "#ddd",
          borderRadius: "6px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 0,
          height: "100%",
          overflow: "hidden",
          fontWeight: "bold",
          fontSize: "0.9rem",
        }}
      >
        <span>Videochiamata medico</span>
      </div>
    </div>
  );
}
