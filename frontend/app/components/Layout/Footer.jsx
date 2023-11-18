export default function Footer() {
  return (
    <footer className="bg-purple-100 text-neutral-800 dark:text-neutral-300 p-6 mt-96">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full md:w-1/3 md:order-2 text-center md:text-right">
          <a
            className="text-purple-400 dark:text-purple-400 hover:text-purple-500 transition-colors duration-300"
            href="https://www.argentina.gob.ar/normativa/nacional/ley-14346-153011/texto"
          >
            Ir a Protección de los animales
          </a>
        </div>
        <div className="w-full md:w-2/3 md:order-1 md:text-left text-center mt-4 md:mt-0">
          <p>© 2023 Copyright: GALAJO</p>
          <p>¿Qué puedo hacer en caso de maltrato o crueldad con animales?</p>
        </div>
      </div>
    </footer>
  );
}