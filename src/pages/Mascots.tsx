import { useContext, useEffect, useState } from "react";
import MascotList from "../components/MascotList";
import type { Mascot } from "../types/mascot";
import { getMascots } from "../api/mascots";
import { useDebounce } from "../hooks";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import SelectOption from "../components/UI/SelectOption";

type SortOptionValueType = "breed" | "name" | "";
// type SortOptionValueType = "breed" | "gender" | "";

type SortOptionsType = {
  value: SortOptionValueType;
  name: string;
};

const sortOptions: SortOptionsType[] = [
  { value: "name", name: "name" },
  { value: "breed", name: "breed" },
  // { value: "gender", name: "by gender" },
];

export default function Mascots() {
  const [mascots, setMascots] = useState<Mascot[]>([]);
  const [searchName, setSearchName] = useState("");
  const [bornBefore, setBornBefore] = useState("");
  const [bornAfter, setBornAfter] = useState("");
  const [selectedSort, setSelectedSort] = useState<SortOptionValueType>("");
  const debouncedSearchName = useDebounce(searchName);
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (loading || !user) return;

    const fetchMascots = async () => {
      try {
        const data = await getMascots(
          debouncedSearchName,
          bornBefore,
          bornAfter,
        );
        setMascots(data.mascots);
        console.log("data mascots : ", data.mascots);
      } catch (error) {
        console.error("Error fetching mascots", error);
      }
    };

    fetchMascots();
  }, [debouncedSearchName, bornBefore, bornAfter, user, loading]);

  const sortedMascots = [...mascots].sort((a, b) => {
    if (!selectedSort) return 0;
    return a[selectedSort].localeCompare(b[selectedSort]);
    // if (selectedSort === "name") return a.name.localeCompare(b.name);
    // if (selectedSort === "breed") return a.breed.localeCompare(b.breed);
  });

  const sortMascots = (selectedOption: SortOptionValueType) => {
    setSelectedSort(selectedOption);
  };

  const resetSort = () => {
    setSelectedSort("");
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" />;

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

      <div className="flex items-center gap-4">
        <SelectOption
          value={selectedSort}
          defaultValue="Sort by"
          options={sortOptions}
          onChange={sortMascots}
        />
        {selectedSort && (
          <button
            onClick={resetSort}
            className="text-sm text-red-600 hover:text-red-800 hover:underline"
          >
            Reset sort
          </button>
        )}
      </div>

      {mascots.length === 0 ? (
        <p className="text-gray-500">No mascots found</p>
      ) : (
        <MascotList mascots={sortedMascots} />
      )}
    </div>
  );
}
