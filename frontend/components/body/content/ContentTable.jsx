import { useState, useEffect } from "react";

export default function ContentTable({ title, data, columns }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aVal = a[sortConfig.key.toLowerCase()];
    const bVal = b[sortConfig.key.toLowerCase()];

    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (col) => {
    const key = col.toLowerCase();
    setSortConfig((prev) => {
      if (prev.key === key) {
        // Toggle sort direction
        return {
          key,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  };

  return (
    <div>
      <p>
        <strong>{title}:</strong>
      </p>
      <table
        border="1"
        style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                onClick={() => handleSort(col)}
                style={{ cursor: "pointer" }}
              >
                {col}
                {sortConfig.key === col.toLowerCase() &&
                  (sortConfig.direction === "asc" ? " 🔼" : " 🔽")}
              </th>
            ))}
          </tr>
        </thead>
        {sortedData?.length > 0 && (
          <tbody>
            {sortedData.map((item, index) => (
              <tr key={index}>
                {columns.map((col, colIndex) => (
                  <td key={colIndex}> {item[col.toLowerCase()]} </td>
                ))}
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}
