import GrayTable from "./graytable";
import { ContenitoreSeduteMedico, ContenitoreSedutePaziente } from "./contenitoreSedute";

export default function SeduteWrapper() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '90vh' }}>
      {/* Sfondo grigio */}
      <GrayTable />

      {/* Contenuto sopra GrayTable */}
      <div
        style={{
          position: 'absolute',
          top: '16%',
          left: '4%',
          width: '92%',
          height: '72%',
          overflowY: 'auto',
          padding: '10px',
          zIndex: 10, // Più alto dello sfondo
        }}
      >
        {/* Esempio di contenuti */}
        <ContenitoreSeduteMedico />
        <ContenitoreSedutePaziente />
      </div>
    </div>
  );
}