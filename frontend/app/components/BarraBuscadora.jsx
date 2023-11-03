"use client"

import axios from "axios";
import Link from "next/link"
import { useState } from "react"


export default function BarraBuscadora() {
    const [query, setQuery] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Aqui puedes agregar la lógica para realizar la búsqueda
        
        const response = await axios.get(`http://localhost:5000/publicacion/buscar/${query}`);
    
        console.log(response.data);
        return response.data
    };

    return (
        <div className="text-center my-20">
            <form onSubmit={handleSubmit}>
                <input className="text-black border-2 border-black rounded-full px-3 py-2" type="text" placeholder="Buscar Animal" value={query} onChange={(e) => setQuery(e.target.value)} />
                <button className="bg-black text-white rounded-full px-3 py-2 hover:bg-black/60" type="submit">Buscar</button>
            </form>
        </div>
      )
    

}