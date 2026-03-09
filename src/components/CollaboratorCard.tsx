import type { Collaborator } from "../types/collaborator";
import type { Mascot } from "../types/mascot";
import MascotCard from "./MascotCard";

interface CollaboratorCardProps {
  collaborator: Collaborator | null;
  mascotsByCollaborator: Mascot[];
}

export default function CollaboratorCard({
  collaborator,
  mascotsByCollaborator,
}: CollaboratorCardProps) {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">{collaborator?.name}</h2>

      <ul className="space-y-4">
        {mascotsByCollaborator.map((mascot) => (
          <li
            className="p-4 rounded-lg bg-white shadow-sm hover:bg-gray-50 space-y-2"
            key={mascot._id}
          >
            <MascotCard mascot={mascot} />
          </li>
        ))}
      </ul>
    </div>
  );
}
