import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import type { Mascot } from "../types/mascot";
import MascotCard from "../components/MascotCard";
import { getMascotById, removeMascot } from "../api/mascots";
import Modal from "../components/Modal";
import { AuthContext } from "../context/AuthContext";

export default function MascotDetails() {
  const [mascot, setMascot] = useState<Mascot | null>(null);
  const [modal, setModal] = useState(false);
  const { id } = useParams();
  const { user, loading } = useContext(AuthContext);

  const navigate = useNavigate();

  console.log("mascot id : ", id);
  console.log("mascot: ", mascot);

  useEffect(() => {
    if (loading || !user || !id) return;

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
  }, [id, user, loading]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" />;
  if (!mascot) return <p>No mascot found</p>;

  return (
    <div className="flex flex-col items-center max-w-md mx-auto p-6 bg-gray-50 rounded-lg shadow-md space-y-4">
      <MascotCard mascot={mascot} />
      <div className="w-full flex items-center justify-between">
        <Link
          className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 font-medium"
          to={`/mascots/${id}/edit`}
        >
          Edit Mascot details
        </Link>
        <button
          className="px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800 font-medium"
          onClick={() => setModal(true)}
        >
          Delete mascot
        </button>
      </div>
      {modal && (
        <Modal
          onDelete={() => removeMascot(mascot._id)}
          onClose={() => setModal(false)}
          onRedirect={() =>
            navigate(`/collaborators/${mascot.collaborator._id}`)
          }
        />
      )}
    </div>
  );
}
