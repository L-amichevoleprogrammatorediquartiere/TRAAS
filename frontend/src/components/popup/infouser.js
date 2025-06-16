import { useEffect, useState } from "react";
import { GetUserRole, RecuperaInfoPaziente, RecuperaInfoMedico } from "../../backend";

export default function InfoUser({ codiceFiscale }) {
  const [role, setRole] = useState(null); // ruolo di chi fa la richiesta
  const [userData, setUserData] = useState(null); // dati dell'utente cercato

  useEffect(() => {
    async function fetchData() {
      const currentUserRole = await GetUserRole();
      setRole(currentUserRole);

      if (currentUserRole === "medico") {
        const data = await RecuperaInfoPaziente(codiceFiscale);
        setUserData(data);
      } else {
        const data = await RecuperaInfoMedico(codiceFiscale);
        setUserData(data);
      }
    }

    fetchData();
  }, [codiceFiscale]);

  if (!userData || !role) return <div>Caricamento...</div>;

  const isMedico = role === "medico";

  return (
    <div
      style={{
        position: "absolute",
        width: "60%",
        height: "32%",
        top: "14%",
        left: "19%",
        boxSizing: "border-box",
      }}
    >
      {/* Immagine a sinistra */}
      <img
        src={userData.immagine}
        alt="Immagine profilo"
        style={{
          position: "absolute",
          top: "15%",
          left: "0%",
          width: "20%",
          height: "70%",
          objectFit: "cover",
          border: "1px solid black",
        }}
      />

      {/* Titolo (codice fiscale o nome medico) */}
      <div
        style={{
          position: "absolute",
          top: "8%",
          left: "26%",
          fontSize: "120%",
          fontWeight: "bold",
        }}
      >
        {isMedico
          ? userData.codice_fiscale
          : `Dott. ${userData.nome} ${userData.cognome}`}
      </div>

      {/* Info dettagliate */}
      <div
        style={{
          position: "absolute",
          top: "28%",
          left: "26%",
          fontSize: "100%",
          lineHeight: "150%",
        }}
      >
        <div>
          {userData.nome}, {userData.cognome}, {userData.data_di_nascita},{" "}
          {userData.genere}
          {isMedico
            ? `, ${userData.patologia_da_trattare}`
            : `, ${userData.specializzazione}`}
        </div>
        <div>
          {userData.email}
        </div>
        <div>
          {userData.telefono}
        </div>
      </div>

      {/* Bottone "Assegna seduta" se si sta guardando un paziente */}
      {isMedico && (
        <button
          style={{
            position: "absolute",
            top: "5%",
            right: "0%",
            padding: "0.5rem 1rem",
            fontSize: "90%",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Assegna seduta
        </button>
      )}
    </div>
  );
}
