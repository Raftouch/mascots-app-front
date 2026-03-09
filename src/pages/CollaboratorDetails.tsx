import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Collaborator } from "../types/collaborator";
import type { Mascot } from "../types/mascot";

export default function CollaboratorDetails() {
  const [collaborator, setCollaborator] = useState<Collaborator | null>(null);
  const [mascotsByCollaborator, setMascotsByCollaborator] = useState<Mascot[]>(
    [],
  );
  const { id } = useParams();

  const getCollaboratorDetails = async () => {
    try {
      const res = await fetch(`http://localhost:4000/collaborators/${id}`);
      const data = await res.json();
      console.log("collab id : ", id);
      console.log("data : ", data.collaborator);
      console.log("data : ", data.mascotsByCollaborator);
      setCollaborator(data.collaborator);
      setMascotsByCollaborator(data.mascotsByCollaborator);
    } catch (error) {
      console.error("Error getting collaborator details", error);
    }
  };

  useEffect(() => {
    getCollaboratorDetails();
  }, [id]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">{collaborator?.name}</h2>

      <ul className="space-y-4">
        {mascotsByCollaborator.map((mascot) => (
          <li
            className="p-4 rounded-lg bg-white shadow-sm hover:bg-gray-50 space-y-2"
            key={mascot._id}
          >
            <p className="font-medium">{mascot.name}</p>
            <p className="text-sm text-gray-600">{mascot.breed}</p>
            <p className="text-sm text-gray-600">{mascot.gender}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
