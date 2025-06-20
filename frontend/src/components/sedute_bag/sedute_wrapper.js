import GrayTable from "../graytable";
import { ContenitoreSeduteMedico, ContenitoreSedutePaziente } from "./contenitore_sedute";

export default function SeduteWrapper({ userRole }) {
  return (
    <div>
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
        }}
      >
        {userRole === 'medico' && <ContenitoreSeduteMedico />}
        {userRole === 'paziente' && <ContenitoreSedutePaziente />}
      </div>
    </div>
  );
}
