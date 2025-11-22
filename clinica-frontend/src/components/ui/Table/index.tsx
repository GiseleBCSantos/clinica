import { type ReactNode } from "react";

interface TableProps<T> {
  headers: string[];
  data: T[];
  renderRow?: (item: T, index: number) => ReactNode;
  className?: string;

  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Table = <T,>({
  headers,
  data,
  renderRow,
  className = "",
  currentPage,
  totalPages,
  onPageChange,
}: TableProps<T>) => {
  const getPaginationButtons = () => {
    const buttons: (number | "...")[] = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);

    if (start > 1) buttons.push(1);
    if (start > 2) buttons.push("...");

    for (let i = start; i <= end; i++) buttons.push(i);

    if (end < totalPages - 1) buttons.push("...");
    if (end < totalPages) buttons.push(totalPages);

    return buttons;
  };

  return (
    <div className="space-y-2">
      <div className="overflow-x-auto">
        <table className={`min-w-full divide-y divide-gray-200 ${className}`}>
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header, i) => (
                <th
                  key={i}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) =>
              renderRow ? (
                renderRow(item, index)
              ) : (
                <tr key={index}>
                  {Object.values(item as Record<string, unknown>).map(
                    (value, i) => (
                      <td
                        key={i}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                      >
                        {value as ReactNode}
                      </td>
                    )
                  )}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-1 mt-4 flex-wrap">
          <button
            className={`px-3 py-1 rounded border ${
              currentPage === 1
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-white hover:bg-gray-100"
            }`}
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {getPaginationButtons().map((p, i) =>
            p === "..." ? (
              <span key={i} className="px-2 text-gray-500">
                ...
              </span>
            ) : (
              <button
                key={i}
                className={`px-3 py-1 rounded border ${
                  p === currentPage
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white border-gray-300 hover:bg-gray-100"
                }`}
                onClick={() => onPageChange(Number(p))}
              >
                {p}
              </button>
            )
          )}

          <button
            className={`px-3 py-1 rounded border ${
              currentPage === totalPages
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-white hover:bg-gray-100"
            }`}
            onClick={() =>
              currentPage < totalPages && onPageChange(currentPage + 1)
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
