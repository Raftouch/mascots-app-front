import type { Mascot } from "../types/mascot";

interface MascotCardProps {
  mascot: Mascot;
}

export default function MascotCard({ mascot }: MascotCardProps) {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">{mascot?.name}</h2>
      <div className="p-4 rounded-lg bg-white shadow-sm hover:bg-gray-50 space-y-2">
        <p className="text-sm text-gray-600">{mascot?.breed}</p>
        <p className="text-sm text-gray-600">{mascot?.gender}</p>
        <p className="text-sm text-gray-600">
          {new Date(mascot?.birthDate).toLocaleDateString()}
        </p>
        <img
          src={`http://localhost:4000/uploads/mascotImages/${mascot.imageName}`}
          alt={`Photo of ${mascot.name}`}
        />
        <p className="text-sm text-gray-600">{mascot?.description}</p>
        <p className="text-sm text-gray-600">
          {new Date(mascot?.joinedAt).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-600">{mascot?.collaborator.name}</p>
      </div>
    </div>
  );
}
