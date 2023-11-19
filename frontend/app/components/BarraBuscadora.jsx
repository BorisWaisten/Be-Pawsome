"use client";

import axios from "axios";
import { useState } from "react";

export default function BarraBuscadora({ handleSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(query);
  };

  return (
    <div className="flex items-center justify-center my-20">
      <form onSubmit={handleSubmit} className="flex w-full max-w-2xl">
        <input
          className="text-purple-400 border-2 border-purple-400 rounded-l-full px-4 py-3 flex-grow"
          type="text"
          placeholder="Buscar Animal"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="bg-purple-400 text-white rounded-r-full px-4 py-3 hover:bg-black/60 flex-none"
          type="submit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-6a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}
