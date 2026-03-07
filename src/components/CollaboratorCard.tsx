import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Collaborator } from "../types/collaborator";
import type { Mascot } from "../types/mascot";

export default function CollaboratorCard() {
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
    <>
      {collaborator?.name}

      <ul>
        {mascotsByCollaborator.map((mascot) => (
          <li key={mascot._id}>
            <p>{mascot.name}</p>
            <p>{mascot.breed}</p>
            <p>{mascot.gender}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
