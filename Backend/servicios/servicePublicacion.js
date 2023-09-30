import PublicacionRepository from "../repositorios/repositorioPublicacion.js";
import { PublicacionRequestError } from "../errores.js";
import { ObjectId } from 'mongodb';


class ServicioPublicacion {
  constructor() {
    this.repository = new PublicacionRepository();
  }

  async crearPublicacion(publicacion) {
    try {
      const nuevaPublicacion = await this.repository.crearPublicacion(publicacion);
      return nuevaPublicacion;
    } catch (error) {
      throw new PublicacionRequestError("Error al crear publicación: " + error.message);
    }
  }

  async obtenerPublicacionPorId(idPublicacion) {
    try {
      const id = new ObjectId(idPublicacion);
      const publicacion = await this.repository.obtenerPublicacionPorId(id);
      if (!publicacion) {
        throw new PublicacionRequestError(`Publicación con ID ${idPublicacion} no encontrada`);
      }
      return publicacion;
    } catch (error) {
      return error
    }
  }

  async actualizarPublicacion(idPublicacion, nuevosDatos) {
    try {

      Val

      const publicacionActualizada = await this.repository.actualizarPublicacion(idPublicacion, nuevosDatos);
      return publicacionActualizada;
    } catch (error) {
      throw new PublicacionRequestError("Error al actualizar publicación: " + error.message);
    }
  }

  async eliminarPublicacion(idPublicacion) {
    try {
      const publicacionEliminada = await this.repository.eliminarPublicacion(idPublicacion);
      if (!publicacionEliminada) {
        throw new PublicacionRequestError(`Publicación con ID ${idPublicacion} no encontrada`);
      }
      return publicacionEliminada;
    } catch (error) {
      throw new PublicacionRequestError("Error al eliminar publicación: " + error.message);
    }
  }
}

export default ServicioPublicacion;
