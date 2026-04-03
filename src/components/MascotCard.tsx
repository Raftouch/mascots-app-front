import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config/api";
import type { Mascot } from "../types/mascot";

interface MascotCardProps {
  mascot: Mascot;
}

export default function MascotCard({ mascot }: MascotCardProps) {
  return (
    // <div className="max-w-md mx-auto p-6">
    // <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
    <div className="w-full bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      <Link to={`/mascots/${mascot._id}`}>
        <img
          className="w-full h-64 object-cover"
          src={`${API_BASE_URL}/uploads/mascotImages/${mascot.imageName}`}
          alt={`Photo of ${mascot.name}`}
        />
      </Link>
      <div className="p-6 space-y-3">
        <h2 className="text-2xl font-bold text-gray-800">{mascot?.name}</h2>
        <div className="text-sm text-gray-600 space-y-1">
          <p>
            <span className="font-semibold">Breed:</span> {mascot?.breed}
          </p>
          <p>
            <span className="font-semibold">Gender:</span> {mascot?.gender}
          </p>
          <p>
            <span className="font-semibold">Birth date:</span>{" "}
            {new Date(mascot?.birthDate).toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold">Joined:</span>{" "}
            {new Date(mascot?.joinedAt).toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold">Owner:</span>{" "}
            {mascot?.collaborator.name}
          </p>
        </div>
        <p className="text-gray-700 pt-2 border-t">{mascot?.description}</p>
      </div>
    </div>
    // </div>
  );
}
