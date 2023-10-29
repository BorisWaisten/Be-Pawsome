"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
export default function Loginbtn() {
  const { data: session, status } = useSession();
  console.log({ session });

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <>
        Signed in as {session.user?.userLogueado.nombre} <br />
        <Image
          src={session.user?.userLogueado.imagenPerfil}
          alt="Imagen Usuario"
          width={50}
          height={50}
          quality={100}        
        />
        <button onClick={() => signOut()} className="btn btn-danger">
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()} className="btn btn-primary">
        Sign in
      </button>
    </>
  );
}
