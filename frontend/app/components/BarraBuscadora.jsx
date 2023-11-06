"use client"

import axios from "axios";
import { useState } from "react"


export default function BarraBuscadora({ handleSearch }) {
    const [query, setQuery] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        handleSearch(query);
      };

    return (
        <div className="flex items-center justify-center my-20">
          <form onSubmit={handleSubmit} className="flex">
            <div className="mr-2">
              <input
                className="text-black border-2 border-black rounded-full px-3 py-2"
                type="text"
                placeholder="Buscar Animal"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div>
              <button
                className="bg-black text-white rounded-full px-3 py-3 hover:bg-black/60"
                type="submit"
              >
                Buscar
              </button>
            </div>
          </form>
        </div>
      );
}
