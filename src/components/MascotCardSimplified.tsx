import { API_BASE_URL } from "../config/api";
import type { Mascot } from "../types/mascot";

interface MascotCardProps {
  mascot: Mascot;
}

export default function MascotCardSimplified({ mascot }: MascotCardProps) {
  const mascotAge =
    new Date().getFullYear() - new Date(mascot.birthDate).getFullYear();

  return (
    <div className="max-w-md mx-auto">
      <div className="flex bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <img
          className="w-40 h-40 object-cover"
          src={`${API_BASE_URL}/uploads/mascotImages/${mascot.imageName}`}
          alt={`Photo of ${mascot.name}`}
        />
        <div className="p-4 flex flex-col justify-center space-y-1">
          <h2 className="text-2l font-bold text-gray-800">{mascot?.name}</h2>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Breed:</span> {mascot?.breed}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Gender:</span> {mascot?.gender}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Age:</span> {mascotAge}
          </p>
        </div>
      </div>
    </div>
  );
}
