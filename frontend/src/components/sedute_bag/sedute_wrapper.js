import GrayTable from "../graytable";
import { ContenitoreSeduteMedico, ContenitoreSedutePaziente } from "./contenitore_sedute";

export default function SeduteWrapper({ userRole }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '90vh' }}>
      {/* Sfondo grigio */}
      <GrayTable />

      {/* Contenuto sopra GrayTable */}
      <div
        style={{
          position: 'absolute',
          top: '20%',       //modifica 20
          left: '4%',
          width: '92%',
          height: '72%',
          overflowY: 'auto',
          padding: '10px',
          zIndex: 10, // Più alto dello sfondo
        }}
      >
        {userRole === 'medico' && <ContenitoreSeduteMedico />}
        {userRole === 'paziente' && <ContenitoreSedutePaziente />}
      </div>
    </div>
  );
}
