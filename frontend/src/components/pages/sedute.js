import ContenitoreSedute from "../contenitoreSedute";
import Navbar from "../navbar";

export default function SedutePage({setView, view}) {
    return (
      <>
        <Navbar setView={setView} view={view}/>
        <ContenitoreSedute/>
        <ContenitoreSedute/>
      </>
    );
  }