import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Mascot } from "../types/mascot";
import MascotCard from "../components/MascotCard";

export default function MascotDetails() {
  const [mascot, setMascot] = useState<Mascot | null>(null);
  const { id } = useParams();

  console.log("mascot id : ", id);

  const getMascotDetails = async () => {
    try {
      const res = await fetch(`http://localhost:4000/mascots/${id}`);
      const data = await res.json();
      console.log("mascot data : ", data.mascot);
      setMascot(data.mascot);
    } catch (error) {
      console.error("Error getting mascot details", error);
    }
  };

  useEffect(() => {
    getMascotDetails();
  }, [id]);

  return <MascotCard mascot={mascot} />;
}
