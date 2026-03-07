import { useEffect, useState } from "react";
import type { Mascot } from "../types/mascot";
import MascotCard from "./MascotCard";
import { Link } from "react-router-dom";

export default function MascotList() {
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

  return (
    <ul>
      {mascots.map((mascot) => (
        <li key={mascot._id}>
          <Link to={`/mascots/${mascot._id}`}>
            {/* <MascotCard /> */}
            <p>{mascot.name}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
