import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import type { Collaborator } from "../types/collaborator";
import type { Mascot } from "../types/mascot";
import CollaboratorCard from "../components/CollaboratorCard";
import CollaboratorService from "../api/collaborator.service";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/UI/Loader/Loader";
import { useFetching } from "../hooks/useFetching";

export default function CollaboratorDetails() {
  const [collaborator, setCollaborator] = useState<Collaborator | null>(null);
  const [mascotsByCollaborator, setMascotsByCollaborator] = useState<Mascot[]>(
    [],
  );

  const { id } = useParams();
  const { user, loading: authLoading } = useContext(AuthContext);

  const [fetchData, isLoading, error] = useFetching(async () => {
    const data = await CollaboratorService.getById(id!);
    setCollaborator(data.collaborator);
    setMascotsByCollaborator(data.mascotsByCollaborator);
  });

  useEffect(() => {
    if (!user || !id) return;

    fetchData();
  }, [id, user]);

  if (authLoading) return <p>Checking your session...</p>;
  if (!user) return <Navigate to="/login" />;
  if (isLoading) return <Loader />;
  if (error) return <p>Something went wrong</p>;
  if (!collaborator) return <p>No collaborator found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <CollaboratorCard
        collaborator={collaborator}
        mascotsByCollaborator={mascotsByCollaborator}
      />
      <div className="flex justify-center">
        <Link
          className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 font-medium"
          to={`/collaborators/${collaborator?._id}/mascots/new`}
        >
          Add mascot
        </Link>
      </div>
    </div>
  );
}
