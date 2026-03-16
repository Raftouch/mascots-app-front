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
    <>
      <h2 className="text-2xl font-bold mb-4">{collaborator?.name}</h2>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mascotsByCollaborator.map((mascot) => (
          <li key={mascot._id}>
            <MascotCard mascot={mascot} />
          </li>
        ))}
      </ul>
    </>
  );
}
