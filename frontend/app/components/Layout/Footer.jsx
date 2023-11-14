"use client";
export default function Footer() {
  return (
    <div
      id="seccion_footer"
      className="sticky mt-96 scroll-mt-10 top-[100vh] w-full bg-neutral-200 text-center dark:bg-neutral-700 lg:text-left"
    >
      <div className="p-4 text-center text-neutral-700 dark:text-neutral-200">
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
    </div>
  );
}
