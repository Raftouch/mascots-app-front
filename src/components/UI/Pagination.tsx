import { getPagesArray } from "../../utils/pages";

interface PaginationProps {
  page: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function Pagination({
  page,
  setPage,
  totalPages,
}: PaginationProps) {
  const pagesArray = getPagesArray(totalPages);

  return (
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
  );
}
