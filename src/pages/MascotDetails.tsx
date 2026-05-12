import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import type { Mascot } from "../types/mascot";
import MascotCard from "../components/MascotCard";
import MascotService from "../api/mascot.service";
import Modal from "../components/Modal";
import { AuthContext } from "../context/AuthContext";

export default function MascotDetails() {
  const [mascot, setMascot] = useState<Mascot | null>(null);
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { user, loading: authLoading } = useContext(AuthContext);

  const navigate = useNavigate();

  console.log("mascot id : ", id);
  console.log("mascot: ", mascot);

  useEffect(() => {
    if (!user || !id) return;

    const getMascotDetails = async (id: string) => {
      try {
        setIsLoading(true);
        const data = await MascotService.getById(id);
        console.log("mascot data : ", data.mascot);
        setMascot(data.mascot);
      } catch (error) {
        console.error("Error getting mascot details", error);
      } finally {
        setIsLoading(false);
      }
    };

    getMascotDetails(id);
  }, [id, user]);

  if (authLoading) return <p>Cheking your session...</p>;
  if (!user) return <Navigate to="/login" />;
  if (isLoading) return <p>Loading collaborator...</p>;
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
          onDelete={() => MascotService.remove(mascot._id)}
          onClose={() => setModal(false)}
          onRedirect={() =>
            navigate(`/collaborators/${mascot.collaborator._id}`)
          }
        />
      )}
    </div>
  );
}
