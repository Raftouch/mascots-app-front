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
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">{mascot?.name}</h2>
      <div className="p-4 rounded-lg bg-white shadow-sm hover:bg-gray-50 space-y-2">
        <p className="text-sm text-gray-600">{mascot?.breed}</p>
        <p className="text-sm text-gray-600">{mascot?.gender}</p>
        {/* <p className="text-sm text-gray-600">{mascot?.birthDate}</p> */}
        <p className="text-sm text-gray-600">{mascot?.description}</p>
        {/* <p className="text-sm text-gray-600">{mascot?.joinedAt}</p> */}
        <p className="text-sm text-gray-600">{mascot?.collaborator.name}</p>
      </div>
    </div>
  );
}
