import { useContext, useEffect, useMemo, useState } from "react";
import CollaboratorList from "../components/CollaboratorList";
import type { Collaborator } from "../types/collaborator";
import { getCollaborators } from "../api/collaborators";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function Collaborators() {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [searchName, setSearchName] = useState("");
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

  const filteredCollaborators = useMemo(() => {
    return collaborators.filter((collab) =>
      collab.name.toLowerCase().includes(searchName.toLowerCase()),
    );
  }, [searchName, collaborators]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" />;
  if (collaborators.length === 0) return <p>No collaborators found</p>;

  return (
    <>
      <div className="flex flex-col max-w-3xl mx-auto p-6">
        <label className="text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          type="text"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </div>
      <CollaboratorList collaborators={filteredCollaborators} />
    </>
  );
}
