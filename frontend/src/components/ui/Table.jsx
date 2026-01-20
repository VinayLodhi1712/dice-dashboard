import { useMemo, useState, useEffect } from "react";

export default function Table({
  columns,
  data,
  pageSizeOptions = [5, 10, 20],
  defaultPageSize = 5,
}) {
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState("1");
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setdebouncedSearch] = useState("");
  console.log("pageInput : ", pageInput);

  useEffect(()=>{
    const timer = setTimeout(()=>{
      setdebouncedSearch(searchText);
      setCurrentPage(1);
      setPageInput(1);
    },300)
    return () => clearTimeout(timer)
  }, [searchText]);

  const filteredData = useMemo(() => {
    if (!debouncedSearch) return data;
    const lowerSearch = debouncedSearch.toLowerCase();
    return data.filter((row) =>
      columns.some((col) =>
        String(row[col.key] ?? "")
          .toLowerCase()
          .includes(lowerSearch),
      ),
    );
  }, [data, debouncedSearch, columns]);
  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  console.log("totalPages : ", totalPages);

  

  if (currentPage > totalPages) {
    setCurrentPage(totalPages);
    setPageInput(String(totalPages));
  }

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

  const goToPage = (page) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;

    setCurrentPage(page);
    setPageInput(String(page));
  };

  return (
    <div className="bg-white border rounded-md mt-4">
      <div className="p-4 border-b flex justify-between items-center">
        <input
          type="text"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          placeholder="Search..."
          className="w-64 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-2 text-left font-medium">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {paginatedData.length ? (
            paginatedData.map((row, idx) => (
              <tr key={idx} className="border-t">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-2">
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-6 text-center text-gray-500"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex items-center justify-between p-4 border-t">
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>

        <div className="flex items-center gap-4">
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              goToPage(1);
            }}
            className="border rounded px-2 py-1 text-sm"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size} / page
              </option>
            ))}
          </select>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Go to</span>

            <input
              type="number"
              min="1"
              max={totalPages}
              value={pageInput}
              onChange={(e) => setPageInput(e.target.value)}
              className="w-16 border rounded px-2 py-1 text-sm"
              placeholder="Page"
            />

            <button
              onClick={() => goToPage(Number(pageInput))}
              className="px-3 py-1 border rounded text-sm hover:bg-gray-100"
            >
              Go
            </button>
          </div>

          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => goToPage(currentPage - 1)}
              className="px-3 py-1 border rounded text-sm disabled:opacity-50"
            >
              Prev
            </button>

            <button
              disabled={currentPage === totalPages}
              onClick={() => goToPage(currentPage + 1)}
              className="px-3 py-1 border rounded text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
