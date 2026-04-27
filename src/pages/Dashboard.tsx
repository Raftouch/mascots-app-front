import { useContext, useEffect, useState } from "react";
import type { Mascot } from "../types/mascot";
import MascotCardSimplified from "../components/MascotCardSimplified";
import { API_BASE_URL } from "../config/api";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const [lastAddedMascots, setLastAddedMascots] = useState<Mascot[]>([]);

  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (loading || !user) return;

    const getDashboard = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/dashboard`, {
          credentials: "include",
        });
        const data = await res.json();
        console.log("data", data.mascots);
        setLastAddedMascots(data.mascots);
      } catch (error) {
        console.error("Error fetching mascots", error);
      }
    };

    getDashboard();
  }, [user, loading]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="bg-white shadow-md rounded-xl p-5">
        <h2 className="text-xl font-semibold mb-4">Recently joined :</h2>

        <div className="space-y-2">
          {lastAddedMascots.map((mascot) => (
            <MascotCardSimplified key={mascot._id} mascot={mascot} />
          ))}
        </div>
      </div>
    </div>
  );
}
