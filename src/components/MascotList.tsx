import { Link } from "react-router-dom";
import type { Mascot } from "../types/mascot";
import MascotCard from "./MascotCard";

interface MascotListProps {
  mascots: Mascot[];
}

export default function MascotList({ mascots }: MascotListProps) {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Mascots</h1>

      <ul className="space-y-2">
        {mascots.map((mascot) => (
          <li
            className="p-3 rounded-lg border border-gray-200"
            key={mascot._id}
          >
            <Link to={`/mascots/${mascot._id}`}>
              <MascotCard mascot={mascot} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
