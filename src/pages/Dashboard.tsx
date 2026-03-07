import { useEffect, useState } from "react";
import type { Mascot } from "../types/mascot";

export default function Dashboard() {
  const [lastAddedMascots, setLastAddedMascots] = useState<Mascot[]>([]);

  const getDashboard = async () => {
    try {
      const res = await fetch("http://localhost:4000/dashboard");
      const data = await res.json();
      console.log("data", data.mascots);
      setLastAddedMascots(data.mascots);
    } catch (error) {
      console.error("Error fetching mascots", error);
    }
  };

  useEffect(() => {
    getDashboard();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="bg-white shadow-md rounded-xl p-5">
        <h2 className="text-xl font-semibold mb-4">Recently added :</h2>

        <ul className="space-y-2">
          {lastAddedMascots.map((mascot) => (
            <li
              className="p-3 rounded-lg border border-gray-200"
              key={mascot._id}
            >
              <p>{mascot.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
