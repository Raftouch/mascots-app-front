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
    <>
      <CollaboratorCard
        collaborator={collaborator}
        mascotsByCollaborator={mascotsByCollaborator}
      />
      <Link
        className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 font-medium"
        to={`/collaborators/${collaborator?._id}/mascots/new`}
      >
        Add mascot
      </Link>
    </>
  );
}
