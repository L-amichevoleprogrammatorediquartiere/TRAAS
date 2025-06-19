import { useEffect, useState } from "react";
import CalendarAgenda from "../calendaragenda";
import GrayTable from "../graytable";
import Navbar from "../navbar";
import Phrases from "../phrases";
import { GetUserRole } from "../../backend";

export default function HomePage({setView, view}) {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
      // Recupera il ruolo al caricamento del componente
      GetUserRole().then((role) => {
      setUserRole(role);
      console.log(role);
    });
  }, []);

  return (
    <>
      {userRole === 'medico' && (
        <>
          <GrayTable />
          <div
            style={{
              position: 'absolute',
              top: '20%',
              left: '25%',
              width: '50%',
              height: '10%',
              display: 'flex',
              alignItems: 'left',
              justifyContent: 'left',
              fontSize: '100%',
            }}
          >
            Calendario appuntamenti
          </div>
          <CalendarAgenda />
        </>
      )}

      <Phrases />
      <Navbar setView={setView} view={view} />
    </>
  );
}
