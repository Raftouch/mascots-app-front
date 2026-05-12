import { useContext, useEffect, useState } from "react";
import CollaboratorList from "../components/CollaboratorList";
import type { Collaborator } from "../types/collaborator";
import CollaboratorService from "../api/collaborator.service";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import Loader from "../components/UI/Loader/Loader";

export default function Collaborators() {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [searchName, setSearchName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearchName = useDebounce(searchName);
  const { user, loading: authLoading } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;

    const fetchCollaborators = async () => {
      try {
        setIsLoading(true);
        // await new Promise((resolve) => setTimeout(resolve, 2000));

        const data = await CollaboratorService.getAll(debouncedSearchName);
        setCollaborators(data.collaborators);
        console.log("data : ", data.collaborators);
      } catch (error) {
        console.error("Error fetching collaborators", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollaborators();
  }, [debouncedSearchName, user]);

  if (authLoading) return <p>Checking your session...</p>;
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
      {isLoading ? (
        <Loader />
      ) : collaborators.length === 0 ? (
        <p className="text-gray-500">No collaborators found</p>
      ) : (
        <CollaboratorList collaborators={collaborators} />
      )}
    </div>
  );
}
