import { useEffect, useState } from "react";
import type { Mascot } from "../types/mascot";
import MascotCardSimplified from "../components/MascotCardSimplified";
import { API_BASE_URL } from "../config/api";
import { Navigate } from "react-router-dom";

type User = {
  _id: string;
};

export default function Dashboard() {
  const [lastAddedMascots, setLastAddedMascots] = useState<Mascot[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPageAccess = async () => {
      try {
        const userRes = await fetch(`${API_BASE_URL}/me`, {
          credentials: "include",
        });

        if (!userRes.ok) {
          setUser(null);
          setLoading(false);
          return;
        }

        console.log("res user : ", userRes);

        const userData = await userRes.json();
        console.log("data user : ", userData);
        setUser(userData);

        const dashboardRes = await fetch(`${API_BASE_URL}/dashboard`, {
          credentials: "include",
        });
        const dashboardData = await dashboardRes.json();
        console.log("dashboardData", dashboardData.mascots);
        setLastAddedMascots(dashboardData.mascots);
      } catch (error) {
        setUser(null);
        // console.error("Error fetching user", error);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getPageAccess();
  }, []);

  // useEffect(() => {
  //   if (!user) return;

  //   const getDashboard = async () => {
  //     try {
  //       const res = await fetch(`${API_BASE_URL}/dashboard`, {
  //         credentials: "include",
  //       });
  //       const data = await res.json();
  //       console.log("data", data.mascots);
  //       setLastAddedMascots(data.mascots);
  //     } catch (error) {
  //       console.error("Error fetching mascots", error);
  //     }
  //   };

  //   getDashboard();
  // }, [user]);

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
