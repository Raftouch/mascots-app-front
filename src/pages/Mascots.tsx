import { useContext, useEffect, useState } from "react";
import MascotList from "../components/MascotList";
import type { Mascot } from "../types/mascot";
import { getMascots } from "../api/mascots";
import { useDebounce } from "../hooks/useDebounce";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import SelectOption from "../components/UI/SelectOption";
import FilterInput from "../components/UI/FilterInput";
import useSortedMascots from "../hooks/useMascots";

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

  const sortedMascots = useSortedMascots({ mascots, selectedSort });

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
        <FilterInput
          label="Name"
          id="name"
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <div className="grid grid-cols-2 gap-4">
          <FilterInput
            label="Born After"
            id="bornAfter"
            type="date"
            value={bornAfter}
            onChange={(e) => setBornAfter(e.target.value)}
          />
          <FilterInput
            label="Born Before"
            id="bornBefore"
            type="date"
            value={bornBefore}
            onChange={(e) => setBornBefore(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
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

      <h1 className="text-3xl font-bold mb-6">Mascots</h1>
      {mascots.length === 0 ? (
        <p className="text-gray-500">No mascots found</p>
      ) : (
        <MascotList mascots={sortedMascots} />
      )}
    </div>
  );
}
