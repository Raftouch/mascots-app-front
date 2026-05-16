import { useContext, useEffect, useState } from "react";
import CollaboratorList from "../components/CollaboratorList";
import type { Collaborator } from "../types/collaborator";
import CollaboratorService from "../api/collaborator.service";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import Loader from "../components/UI/Loader/Loader";
import { useFetching } from "../hooks/useFetching";
import { getPagesArray } from "../utils/pages";

export default function Collaborators() {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [searchName, setSearchName] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const pagesArray = getPagesArray(totalPages);

  const debouncedSearchName = useDebounce(searchName);

  const { user, loading: authLoading } = useContext(AuthContext);

  const [fetchData, isLoading, error] = useFetching(async () => {
    const data = await CollaboratorService.getAll(debouncedSearchName, page);
    setCollaborators(data.collaborators);
    setTotalPages(data.pages);
  });

  useEffect(() => {
    if (!user) return;

    fetchData();
  }, [debouncedSearchName, user, page]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchName]);

  if (authLoading) return <p>Checking your session...</p>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex flex-col mb-6">
        <label className="text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          type="text"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </div>

      <h1 className="text-3xl font-bold mb-6">Collaborators</h1>
      {error && <p>Something went wrong</p>}
      {isLoading ? (
        <Loader />
      ) : collaborators.length === 0 ? (
        <p className="text-gray-500">No collaborators found</p>
      ) : (
        <CollaboratorList collaborators={collaborators} />
      )}

      <div className="flex justify-between mt-8">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="flex gap-4">
          {/* {page} / {totalPages} */}
          {pagesArray.map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`${page === p ? "px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 font-medium" : ""} border py-2 px-4 rounded-md`}
            >
              {p}
            </button>
          ))}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
