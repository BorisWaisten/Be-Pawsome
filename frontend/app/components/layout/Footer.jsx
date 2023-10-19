"use client";
//fixed bottom-0 w-full original 
//sticky bottom-0 z-50


//sticky top-[100vh]


//html, body { height: 100%;}


//position: sticky;
//top: 100vh;

export default function Footer() {
 
return (
    <div id="seccion_footer" class="sticky top-[100vh] w-full bg-neutral-200 text-center dark:bg-neutral-700 lg:text-left">
      <div class="p-4 text-center text-neutral-700 dark:text-neutral-200">
        <p>© 2023 Copyright: GALAJO ¿Qué puedo hacer en caso de maltrato o crueldad con animales?</p>
        <a
          class="text-neutral-800 dark:text-neutral-400"
          href="https://www.argentina.gob.ar/normativa/nacional/ley-14346-153011/texto"
        >
          <p>Ir a Proteccion de los animales </p>
        </a>
      
      </div>
    </div>
  );
}
