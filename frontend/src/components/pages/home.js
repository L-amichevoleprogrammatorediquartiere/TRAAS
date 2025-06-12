import CalendarAgenda from "../calendaragenda";
import GrayTable from "../graytable";
import Navbar from "../navbar";
import Phrases from "../phrases";

export default function HomePage() {
    return (
      <>
        <Navbar/>
        <GrayTable/>
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '25%',
          width: '50%',
          height: '10%',
          display: 'flex',
          alignItems: 'left',
          justifyContent: 'left',
          fontSize: '100%'
        }}>
          Calendario appuntamenti
        </div>
        <CalendarAgenda/>
        <Phrases/>
      </>
    );
  }