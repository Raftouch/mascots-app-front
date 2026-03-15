import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Mascot } from "../types/mascot";
import MascotCard from "../components/MascotCard";
import { getMascotById } from "../api/mascots";

export default function MascotDetails() {
  const [mascot, setMascot] = useState<Mascot | null>(null);
  const { id } = useParams();

  console.log("mascot id : ", id);

  useEffect(() => {
    const getMascotDetails = async (id: string) => {
      try {
        const data = await getMascotById(id);
        console.log("mascot data : ", data.mascot);
        setMascot(data.mascot);
      } catch (error) {
        console.error("Error getting mascot details", error);
      }
    };

    if (!id) return;
    getMascotDetails(id);
  }, [id]);

  if (!mascot) return <p>No mascot found</p>;

  return (
    <>
      <MascotCard mascot={mascot} />
      <Link
        className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 font-medium"
        to={`/mascots/${id}/edit`}
      >
        Edit Mascot details
      </Link>
    </>
  );
}
