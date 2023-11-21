import AdopcionRepository from "../repositorios/repositorioAdopcion.js";
import { AdopcionRequestError } from "../errores.js";
import Adopcion from "../modelos/modeloAdopcion.js";
import UsuarioRepository from "../repositorios/repositorioUser.js";
import PublicacionRepository from "../repositorios/repositorioPublicacion.js";

class ServicioAdopcion {
  constructor() {
    this.repositoryAdopcion = new AdopcionRepository();
    this.repositorioUsuarios = new UsuarioRepository();
    this.repositorioPublicaciones = new PublicacionRepository();
  }

  async crearAdopcion(idPublicacion,idAdoptante) {

    console.log("datos para adopcion")
    console.log(idPublicacion + "id publicacion")
    console.log(idAdoptante + "id adoptante") 
    const publicacion = await this.PublicacionRepository.obtenerPublicacionPorId(idPublicacion);
    const adoptante = await this.UsuarioRepository.obtenerUsuarioPorId(idAdoptante);
    const oferente = await this.UsuarioRepository.obtenerUsuarioPorId(publicacion.animal.oferete._id);

    const adopcion = new Adopcion(oferente, adoptante, publicacion);
    

    try {
      const nuevaAdopcion = await this.repositoryAdopcion.crearAdopcion(adopcion);
      return nuevaAdopcion;
    } catch (error) {
      throw new AdopcionRequestError("Error al crear adopción: " + error.message);
    }
  }

  async obtenerAdopciones() {
    try {
      const adopciones = await this.repository.obtenerAdopciones();
      return adopciones;
    } catch (error) {
      throw new AdopcionRequestError("Error al obtener adopciones: " + error.message);
    }
  }
  async obtenerAdopcionPorUsuario(idUsuario) {
    try {
      const adopcion = await this.repository.obtenerAdopcionPorIdUsuario(idUsuario);
      return adopcion;
    } catch (error) {
      throw new AdopcionRequestError("Error al obtener adopción: " + error.message);
    }
  }

  async actualizarAdopcion(idUsuario, nuevosDatos) {
    try {
      const adopcionActualizada = await this.repository.actualizarAdopcion(idUsuario, nuevosDatos);
      return adopcionActualizada;
    } catch (error) {
      throw new AdopcionRequestError("Error al actualizar adopción: " + error.message);
    }
  }

  async eliminarAdopcion(idUsuario) {
    try {
      const adopcionEliminada = await this.repository.eliminarAdopcion(idUsuario);
      return adopcionEliminada;
    } catch (error) {
      throw new AdopcionRequestError("Error al eliminar adopción: " + error.message);
    }
  }
}

export default ServicioAdopcion;
