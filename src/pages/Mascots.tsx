import { useEffect, useState } from "react";
import MascotList from "../components/MascotList";
import type { Mascot } from "../types/mascot";

export default function Mascots() {
  const [mascots, setMascots] = useState<Mascot[]>([]);

  const fetchMascots = async () => {
    try {
      const res = await fetch("http://localhost:4000/mascots");
      const data = await res.json();
      setMascots(data.mascots);
      console.log("data mascots : ", data.mascots);
    } catch (error) {
      console.error("Error fetching mascots", error);
    }
  };

  useEffect(() => {
    fetchMascots();
  }, []);

  return <MascotList mascots={mascots} />;
}
