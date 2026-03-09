import { useEffect, useState } from "react";
import CollaboratorList from "../components/CollaboratorList";
import type { Collaborator } from "../types/collaborator";

export default function Collaborators() {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);

  const fetchCollaborators = async () => {
    try {
      const res = await fetch("http://localhost:4000/collaborators");
      const data = await res.json();
      setCollaborators(data.collaborators);
      console.log("data : ", data.collaborators);
    } catch (error) {
      console.error("Error fetching collaborators", error);
    }
  };

  useEffect(() => {
    fetchCollaborators();
  }, []);

  return <CollaboratorList collaborators={collaborators} />;
}
