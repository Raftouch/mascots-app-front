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
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Mascots</h1>

      <ul className="space-y-2">
        {mascots.map((mascot) => (
          <li
            className="p-3 rounded-lg border border-gray-200"
            key={mascot._id}
          >
            <Link to={`/mascots/${mascot._id}`}>
              {/* <MascotCard /> */}
              <p className="font-medium">{mascot.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
