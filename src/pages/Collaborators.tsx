import { useContext, useEffect, useState } from "react";
import CollaboratorList from "../components/CollaboratorList";
import type { Collaborator } from "../types/collaborator";
import { getCollaborators } from "../api/collaborators";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function Collaborators() {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (loading || !user) return;

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
  }, [user, loading]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" />;
  if (collaborators.length === 0) return <p>No collaborators found</p>;

  return <CollaboratorList collaborators={collaborators} />;
}
