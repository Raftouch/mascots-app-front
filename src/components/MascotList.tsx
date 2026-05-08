import { Link } from "react-router-dom";
import type { Mascot } from "../types/mascot";
import MascotCardSimple from "./MascotCardSimplified";

interface MascotListProps {
  mascots: Mascot[];
}

export default function MascotList({ mascots }: MascotListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {mascots.map((mascot) => (
        <Link key={mascot._id} to={`/mascots/${mascot._id}`}>
          <MascotCardSimple mascot={mascot} />
        </Link>
      ))}
    </div>
  );
}
