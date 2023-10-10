'use client'
import { useSession } from "next-auth/react";

export default function Usuario() {
  const { data: session, status } = useSession();

  return (
    <main>
      <h2>Usuario</h2>
      {status === "loading" && <p>Cargando...</p>}
      {status === "authenticated" && session && (
        <div>
          <p>Bienvenido, {session.user.name}!</p>
          <p>Email: {session.user.email}</p>
          {/* Mostrar otros datos del usuario según sea necesario */}
        </div>
      )}
      {status === "unauthenticated" && <p>Por favor, inicia sesión para ver esta página.</p>}
    </main>
  );
}