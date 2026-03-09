import { Link } from "react-router-dom";
import type { Collaborator } from "../types/collaborator";

interface CollaboratorListProps {
  collaborators: Collaborator[];
}

export default function CollaboratorList({
  collaborators,
}: CollaboratorListProps) {
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
