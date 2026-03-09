import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Mascot } from "../types/mascot";
import MascotCard from "../components/MascotCard";
import { getMascotById } from "../api/mascots";

export default function MascotDetails() {
  const [mascot, setMascot] = useState<Mascot | null>(null);
  const { id } = useParams();

  console.log("mascot id : ", id);

  const getMascotDetails = async (id: string) => {
    try {
      const data = await getMascotById(id);
      console.log("mascot data : ", data.mascot);
      setMascot(data.mascot);
    } catch (error) {
      console.error("Error getting mascot details", error);
    }
  };

  useEffect(() => {
    if (!id) return;
    getMascotDetails(id);
  }, [id]);

  return <MascotCard mascot={mascot} />;
}
