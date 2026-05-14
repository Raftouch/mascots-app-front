import { useContext, useEffect, useState } from "react";
import type { Mascot } from "../types/mascot";
import MascotCardSimplified from "../components/MascotCardSimplified";
import { API_BASE_URL } from "../config/api";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/UI/Loader/Loader";
import { useFetching } from "../hooks/useFetching";

export default function Dashboard() {
  const [lastAddedMascots, setLastAddedMascots] = useState<Mascot[]>([]);

  const { user, loading: authLoading } = useContext(AuthContext);

  const [fetchData, isLoading, error] = useFetching(async () => {
    const res = await fetch(`${API_BASE_URL}/dashboard`, {
      credentials: "include",
    });
    const data = await res.json();
    setLastAddedMascots(data.mascots);
  });

  useEffect(() => {
    if (!user) return;

    fetchData();
  }, [user]);

  if (authLoading) return <p>Checking your session...</p>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="bg-white shadow-md rounded-xl p-5">
        <h2 className="text-xl font-semibold mb-4">Recently joined :</h2>
        {error && <p>Something went wrong</p>}

        <div className="space-y-2">
          {isLoading ? (
            <Loader />
          ) : lastAddedMascots.length === 0 ? (
            <p>No mascots yet</p>
          ) : (
            lastAddedMascots.map((mascot) => (
              <MascotCardSimplified key={mascot._id} mascot={mascot} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
