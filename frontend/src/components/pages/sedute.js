import { ContenitoreSedutePaziente, ContenitoreSeduteMedico } from "../contenitoreSedute";
import GrayTable from "../graytable";
import Navbar from "../navbar";
import SeduteWrapper from "../seduteWrapper";

export default function SedutePage() {
  return (
    <>
      <Navbar />
      <SeduteWrapper/>
      
      {/* <GrayTable /> se vuoi, puoi aggiungere anche questo */}
    </>
  );
}