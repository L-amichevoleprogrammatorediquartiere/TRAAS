export default function DatiSeduta({ fase, dati }) {
  return (
    <div
      style={{
        border: "1px solid #aaa",
        borderRadius: "6px",
        padding: "10px 12px",
        backgroundColor: "#f8f8f8",
        marginTop: "7.5px", // spazio di 0.2cm sopra il testo
        flexShrink: 0,
        width: "100%",
        boxSizing: "border-box",
        overflowY: "auto",
        fontSize: "0.9rem",
        maxHeight: "35%",
      }}
    >
      <h5 style={{ marginTop: 0, marginBottom: "4px" }}>
        {fase === "esercizio" ? "Avanzamento Seduta" : "Riepilogo Seduta"}
      </h5>
      <ul style={{ margin: 0, paddingLeft: "18px" }}>
        <li>
          <strong>Esercizio Attuale:</strong> {dati.attuale}
        </li>
        <li>
          <strong>Prossimo Esercizio:</strong> {dati.prossimo}
        </li>
      </ul>
    </div>
  );
}
