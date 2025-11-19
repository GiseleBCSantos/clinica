import { type ReactNode } from "react";

interface TableProps<T> {
  headers: string[]; // nomes das colunas
  data: T[]; // array de objetos
  renderRow?: (item: T, index: number) => ReactNode; // opcional, para custom row
  className?: string;
}

export function Table<T>({
  headers,
  data,
  renderRow,
  className = "",
}: TableProps<T>) {
  return (
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
  );
}

export default Table;
