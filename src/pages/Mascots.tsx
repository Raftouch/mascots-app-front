import { useEffect, useState } from "react";
import MascotList from "../components/MascotList";
import type { Mascot } from "../types/mascot";
import { getMascots } from "../api/mascots";

export default function Mascots() {
  const [mascots, setMascots] = useState<Mascot[]>([]);
  const [searchName, setSearchName] = useState("");

  const fetchMascots = async () => {
    try {
      const data = await getMascots(searchName);
      setMascots(data.mascots);
      console.log("data mascots : ", data.mascots);
    } catch (error) {
      console.error("Error fetching mascots", error);
    }
  };

  useEffect(() => {
    fetchMascots();
  }, [searchName]);

  if (mascots.length === 0) return <p>No mascots found</p>;

  return (
    <>
      <input
        type="text"
        className="border"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />
      <MascotList mascots={mascots} />
    </>
  );
}
