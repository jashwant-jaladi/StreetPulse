"use client";
import React from "react";
import { useRouter } from "next/navigation"; // To use Next.js router

const Pagination = ({ currentPage, totalPages }) => {
  const router = useRouter();

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      router.push(`?page=${page}`); // Update the URL with the new page number
    }
  };

  return (
    <div className="flex justify-center space-x-4 mt-10">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        className={`border-2 border-yellow-600 p-3 rounded-lg cursor-pointer ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Previous
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`bg-black text-yellow-600 hover:text-white border-2 border-yellow-600 p-3 flex flex-row justify-center content-center rounded-lg ${
            page === currentPage ? "font-bold" : ""
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className={`border-2 border-yellow-600 p-3 rounded-lg cursor-pointer ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
