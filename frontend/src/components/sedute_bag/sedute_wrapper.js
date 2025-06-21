import GrayTable from "../graytable";
import { ContenitoreSeduteMedico, ContenitoreSedutePaziente } from "./contenitore_sedute";

export default function SeduteWrapper({ userRole }) {
  return (
    <div>
      {/* Sfondo grigio */}
      <GrayTable />

      {userRole === 'medico' && <ContenitoreSeduteMedico />}
      {userRole === 'paziente' && <ContenitoreSedutePaziente />}

    </div>
  );
}
