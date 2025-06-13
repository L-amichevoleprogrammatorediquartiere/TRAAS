import Indicees from "../esercizi/indicees";
import Navbar from "../navbar";
import GrayTable from "../graytable";


export default function EserciziPage({setView, view}) {
    return (
      <>
        <Navbar setView={setView} view={view}/>
        <GrayTable/>
        <Indicees/>
      </>
    );
  }