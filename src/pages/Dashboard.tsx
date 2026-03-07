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
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>Recently added :</h2>

        <ul>
          {lastAddedMascots.map((mascot) => (
            <li key={mascot._id}>{mascot.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
