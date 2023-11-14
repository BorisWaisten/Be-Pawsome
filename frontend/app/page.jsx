import { Suspense } from "react"
import Cargando from "./components/cargando"
import PublicacionPage from "./components/Publicaciones/PublicacionPage"

export default function page() {
  const { data: session } = useSession();
  const [publicacionesOriginales, setPublicacionesOriginales] = useState([]); // Nuevo estado
  const [publicaciones, setPublicaciones] = useState([]);
  const [datosCargados, setDatosCargados] = useState(false);
  const [query, setQuery] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/publicacion/publicaciones");
        const publicacionesData = await response.json();

        if (session !== null && session !== undefined) {
          const idUsuario = session.user.id;
          
          console.log("idUsuario:", idUsuario);
          console.log("datos:", publicacionesData);
          if (idUsuario) {
            const publicacionesFiltradas = publicacionesData.filter((p) => p.usuario.id !== idUsuario);
            console.log("publicacionesFiltradas:", publicacionesFiltradas);
            setPublicaciones(publicacionesFiltradas);
            setPublicacionesOriginales(publicacionesFiltradas); // Almacena las originales
          } else {
            setPublicaciones(publicacionesData);
            setPublicacionesOriginales(publicacionesData); // Almacena las originales
          }
  
          setDatosCargados(true);
          console.log("Session:", session);
        }else{
          console.log("datos:", publicacionesData);
          setPublicaciones(publicacionesData);
          setPublicacionesOriginales(publicacionesData);
          setDatosCargados(true);          // Almacena las originales
        }
        
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, [session]);

  const handleSearch = async (query) => {
    try {
     if (session !==null  || session !== undefined) {
    }
    setQuery(query);
    const response = await fetch(`http://localhost:5000/publicacion/buscar/${query}`);
    const publicacionesBuscadas = await response.json();
    const idUsuario = session.user.id;


      if (idUsuario) {
        const publicacionesFiltradas = publicacionesBuscadas.filter((p) => p.usuario.id !== idUsuario);
        setPublicaciones(publicacionesFiltradas);
      } else {
        setPublicaciones(publicacionesBuscadas);
      }
    } catch (error) {
      console.error("Error al obtener datos de búsqueda:", error);
    }
  };

  // Restaurar las publicaciones originales al cambiar de URL
  useEffect(() => {
    if (!query) {
      setPublicaciones(publicacionesOriginales);
    }
  }, [query, publicacionesOriginales]);


  if (!datosCargados) {
    // Mostrar un mensaje de carga o un spinner mientras se cargan los datos
    return <p>Cargando...</p>;
  }
  return (
      <>
        <div>
          <Suspense fallback={<Cargando/>}>
            <PublicacionPage/>
          </Suspense> 
        </div>
      </>
    )
  }