"use client"

import axios from "axios";
import { useState } from "react"


export default function BarraBuscadora({getPublicaciones}) {
    const [query, setQuery] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await axios.get(`http://localhost:5000/publicacion/buscar/${query}`);
    
        getPublicaciones(response.data);
    };

    return (
        <div className="text-center my-20">
            <form onSubmit={handleSubmit}>
                <div>
                    <input className="text-black border-2 border-black rounded-full px-3 py-2" type="text" placeholder="Buscar Animal" value={query} onChange={(e) => setQuery(e.target.value)} />
                </div>
                <div>
                    <button className="bg-black text-white rounded-full px-3 py-2 hover:bg-black/60" type="submit">Buscar</button>
                </div>
            </form>
        </div>
    )
}
