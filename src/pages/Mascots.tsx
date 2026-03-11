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
    <>
      <label>Name</label>
      <input
        type="text"
        className="border"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />
      <div className="flex flex-col">
        <label>Born After</label>
        <input
          type="date"
          className="border"
          value={bornAfter}
          onChange={(e) => setBornAfter(e.target.value)}
        />
        <label>Born Before</label>
        <input
          type="date"
          className="border"
          value={bornBefore}
          onChange={(e) => setBornBefore(e.target.value)}
        />
      </div>
      {mascots.length === 0 ? (
        <p>No mascots found</p>
      ) : (
        <MascotList mascots={mascots} />
      )}
    </>
  );
}
