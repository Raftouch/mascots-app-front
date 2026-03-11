import { useEffect, useState } from "react";
import MascotList from "../components/MascotList";
import type { Mascot } from "../types/mascot";
import { getMascots } from "../api/mascots";

export default function Mascots() {
  const [mascots, setMascots] = useState<Mascot[]>([]);
  const [searchName, setSearchName] = useState("");
  const [bornBefore, setBornBefore] = useState("");
  const [bornAfter, setBornAfter] = useState("");

  const fetchMascots = async () => {
    try {
      const data = await getMascots(searchName, bornBefore, bornAfter);
      setMascots(data.mascots);
      console.log("data mascots : ", data.mascots);
    } catch (error) {
      console.error("Error fetching mascots", error);
    }
  };

  useEffect(() => {
    fetchMascots();
  }, [searchName, bornBefore, bornAfter]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-6 space-y-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Born After
            </label>
            <input
              type="date"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={bornAfter}
              onChange={(e) => setBornAfter(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Born Before
            </label>
            <input
              type="date"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={bornBefore}
              onChange={(e) => setBornBefore(e.target.value)}
            />
          </div>
        </div>
      </div>
      {mascots.length === 0 ? (
        <p className="text-gray-500">No mascots found</p>
      ) : (
        <MascotList mascots={mascots} />
      )}
    </div>
  );
}
