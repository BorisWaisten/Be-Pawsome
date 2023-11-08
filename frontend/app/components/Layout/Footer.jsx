<<<<<<< HEAD:frontend/app/components/layout/Footer.jsx
"use client";
//fixed bottom-0 w-full original
=======

//fixed bottom-0 w-full original 
>>>>>>> origin/development:frontend/app/components/Layout/Footer.jsx
//sticky bottom-0 z-50

//sticky top-[100vh]

//html, body { height: 100%;}

//position: sticky;
//top: 100vh;

export default function Footer() {
  return (
    <footer className= "fixed bottom-0 bg-neutral-200 text-center dark:bg-neutral-300 dark:text-neutral-800">
      <div className="p-4 text-center text-neutral-700 dark:text-neutral-500">
        <p>
          © 2023 Copyright: GALAJO ¿Qué puedo hacer en caso de maltrato o
          crueldad con animales?
        </p>
        <a
          className="text-neutral-800 dark:text-neutral-400"
          href="https://www.argentina.gob.ar/normativa/nacional/ley-14346-153011/texto"
        >
          <p className="font-bold m-2">Ir a Proteccion de los animales </p>
        </a>
      </div>
    </footer>
  );
}
