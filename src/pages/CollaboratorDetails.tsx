import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Collaborator } from "../types/collaborator";
import type { Mascot } from "../types/mascot";
import CollaboratorCard from "../components/CollaboratorCard";
import { getCollaboratorById } from "../api/collaborators";

export default function CollaboratorDetails() {
  const [collaborator, setCollaborator] = useState<Collaborator | null>(null);
  const [mascotsByCollaborator, setMascotsByCollaborator] = useState<Mascot[]>(
    [],
  );
  const { id } = useParams();

  useEffect(() => {
    const getCollaboratorDetails = async (id: string) => {
      try {
        const data = await getCollaboratorById(id);
        setCollaborator(data.collaborator);
        setMascotsByCollaborator(data.mascotsByCollaborator);
      } catch (error) {
        console.error("Error getting collaborator details", error);
      }
    };

    if (!id) return;
    getCollaboratorDetails(id);
  }, [id]);

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
