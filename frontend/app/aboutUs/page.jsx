import Image from "next/image";
import GalajoLogotipo from "public/galajoLogotipo.png";

export default function AboutUs() {
  return (
    <main>
      <h1>Conozca a GALAJO</h1>
      <Image
        src={GalajoLogotipo} 
        alt='Galajo Logo'
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }} // optional
        placeholder="blur"
      />
      <br/>
      <p align = "justify">
        {" "}
        En <b>Galajo</b>, nos enorgullecemos de ser una empresa dedicada
        exclusivamente a brindar soluciones de software de alta calidad. Nuestra
        experiencia y pasión por la tecnología nos han llevado a especializarnos
        en diversos aspectos del ámbito del software, abarcando desde la
        reparación y mejora de aplicaciones existentes hasta la creación y
        diseño de soluciones completamente nuevas.
      </p>
      <br/>
      <h2>Mision</h2>
      <p align = "justify">
        Nuestra misión fundamental es superar las expectativas de nuestros
        clientes en el vasto panorama de las soluciones tecnológicas. Estamos
        comprometidos a proporcionar no solo resultados sobresalientes en el
        ámbito de las tecnologías de la información, sino también a garantizar
        la plena satisfacción tanto de nuestros clientes como de los usuarios de
        las plataformas que creamos. Guiamos a nuestros clientes en su viaje
        hacia el crecimiento y la excelencia, convirtiéndonos en socios en cada
        paso del camino.
      </p>
      <br/>
      <h2>Vision</h2>
      <p align = "justify">
        Aspiramos a ser reconocidos a nivel nacional e internacional como un
        equipo líder y vanguardista. Nos esforzamos por establecer nuevos
        estándares de calidad, profesionalismo y eficiencia en la industria
        tecnológica. Nuestra empatía humana impulsa nuestra búsqueda
        inquebrantable de los objetivos de nuestros clientes, y mediante nuestro
        compromiso con la excelencia, nos esforzamos por contribuir
        significativamente a su éxito.
      </p>
    </main>
  );
}
