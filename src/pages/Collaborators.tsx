import { useEffect, useState } from "react";
import CollaboratorList from "../components/CollaboratorList";
import type { Collaborator } from "../types/collaborator";
import { getCollaborators } from "../api/collaborators";

export default function Collaborators() {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);

  useEffect(() => {
    const fetchCollaborators = async () => {
      try {
        const data = await getCollaborators();
        setCollaborators(data.collaborators);
        console.log("data : ", data.collaborators);
      } catch (error) {
        console.error("Error fetching collaborators", error);
      }
    };

    fetchCollaborators();
  }, []);

  if (collaborators.length === 0) return <p>No collaborators found</p>;

  return <CollaboratorList collaborators={collaborators} />;
}
