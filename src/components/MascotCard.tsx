import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Mascot } from "../types/mascot";

export default function MascotCard() {
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

  return (
    <>
      <p>{mascot?.name}</p>
      <p>{mascot?.breed}</p>
      <p>{mascot?.gender}</p>
      <p>{mascot?.birthDate}</p>
      <p>{mascot?.description}</p>
      <p>{mascot?.joinedAt}</p>
      <p>{mascot?.collaborator.name}</p>
    </>
  );
}
