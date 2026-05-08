import { useContext, useEffect, useState } from "react";
import CollaboratorList from "../components/CollaboratorList";
import type { Collaborator } from "../types/collaborator";
import { getCollaborators } from "../api/collaborators";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useDebounce } from "../hooks";

export default function Collaborators() {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [searchName, setSearchName] = useState("");
  const debouncedSearchName = useDebounce(searchName);
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (loading || !user) return;

    const fetchCollaborators = async () => {
      try {
        const data = await getCollaborators(debouncedSearchName);
        setCollaborators(data.collaborators);
        console.log("data : ", data.collaborators);
      } catch (error) {
        console.error("Error fetching collaborators", error);
      }
    };

    fetchCollaborators();
  }, [debouncedSearchName, user, loading]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex flex-col mb-6">
        <label className="text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          type="text"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </div>

      <h1 className="text-3xl font-bold mb-6">Collaborators</h1>
      {collaborators.length === 0 ? (
        <p className="text-gray-500">No collaborators found</p>
      ) : (
        <CollaboratorList collaborators={collaborators} />
      )}
    </div>
  );
}
