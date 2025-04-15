import React from "react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [...Array(totalPages)].map((_, i) => i + 1);

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={currentPage === page ? "active" : ""}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}
