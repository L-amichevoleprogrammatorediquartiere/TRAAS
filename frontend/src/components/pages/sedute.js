import { useEffect, useState } from "react";
import Navbar from "../navbar";
import SeduteWrapper from "../sedute_bag/sedute_wrapper";
import { GetUserRole } from "../../backend";

export default function SedutePage({ setView, view }) {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    GetUserRole().then(role => setUserRole(role));
  }, []);

  return (
    <>
      <Navbar setView={setView} view={view} />
      <SeduteWrapper userRole={userRole} />
    </>
  );
}
