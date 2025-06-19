import { useEffect, useState } from "react";
import Interrompi from "../button/interrompi";
import Componente_video from "./componente_video";
import Dati_seduta from "./dati_seduta";

export default function PaginaEsercizio({ seduta, onBack }) {
  const [fase, setFase] = useState("esercizio");

  const datiMediapipeMock = {
    attuale: "Corsa del Giaguaro",
    prossimo: "Alzata del T-rex",
  };

  // Simula la fine dell'esercizio dopo 10 secondi (da sostituire con evento reale Mediapipe)
  useEffect(() => {
    if (fase === "esercizio") {
      const timer = setTimeout(() => {
        console.log("Esercizio terminato da Mediapipe (simulato)");
        setFase("riepilogo");
      }, 10000); // 10 secondi

      return () => clearTimeout(timer); // cleanup se il componente si smonta
    }
  }, [fase]);

  return (
    <div
      style={{
        padding: "8px",
        height: "80vh",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
        position: "relative",
        fontSize: "14px",
      }}
    >
      {/* Bottone Interrompi */}
      <div style={{ position: "absolute", top: "12px", right: "12px", zIndex: 10 }}>
        <Interrompi onClick={onBack} />
      </div>

      {/* Data della seduta */}
      <h4 style={{ textAlign: "left", marginBottom: "12px", fontSize: "1rem", zIndex: 10 }}>
        Seduta del {seduta?.data || "Data non disponibile"}
      </h4>

      {/* Video Mediapipe + Medico */}
      <Componente_video fase={fase} />

      {/* Dati Seduta */}
      <Dati_seduta fase={fase} dati={datiMediapipeMock} />

      {/* Nessun bottone "fine esercizio" visibile */}
    </div>
  );
}
