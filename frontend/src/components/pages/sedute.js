import { ContenitoreSedutePaziente, ContenitoreSeduteMedico } from "../contenitoreSedute";
import GrayTable from "../graytable";
import Navbar from "../navbar";
import SeduteWrapper from "../seduteWrapper";

export default function SedutePage({setView, view}) {
  return (
    <>
      <Navbar setView={setView} view={view}/>
      <SeduteWrapper/>
      
      {/* <GrayTable /> se vuoi, puoi aggiungere anche questo */}
    </>
  );
}