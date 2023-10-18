import React from "react";
import Link from "next/link";
import Image from "next/image";

const ImgProfile = ({imagenPerfil}) => {
  return (
    <>
      <Link className="p-2 rounded-sm m-1 ml-auto " href="/usuario">
        <img
          src={imagenPerfil}
          alt="imagen perfil"
          width={50}
          height={50}
          quality={100}
        />
      </Link>
    </>
  );
};

export default ImgProfile;
