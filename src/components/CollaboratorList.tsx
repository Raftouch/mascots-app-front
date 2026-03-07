import { useEffect, useState } from "react";
import type { Collaborator } from "../types/collaborator";
import CollaboratorCard from "./CollaboratorCard";
import { Link } from "react-router-dom";

export default function CollaboratorList() {
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

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Collaborators</h1>

      <ul className="space-y-2">
        {collaborators.map((collab) => (
          <li
            className="p-3 rounded-lg border border-gray-200"
            key={collab._id}
          >
            <Link to={`/collaborators/${collab._id}`}>
              <p className="font-medium">{collab.name}</p>
              {/* <CollaboratorCard /> */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
