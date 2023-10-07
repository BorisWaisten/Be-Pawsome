import PublicacionRepository from "../repositorios/repositorioPublicacion.js";
import { PublicacionRequestError} from "../errores.js";
import PublicRequest from "../validacionRequest/publicRequest.js"
import { ObjectId } from 'mongodb';
import ServicioUsuario from "../servicios/serviceUsuarios.js";


class ServicioPublicacion {
  constructor() {
    this.repository = new PublicacionRepository();
    this.servicioUsuario = new ServicioUsuario();
  }

  async crearPublicacion(publicacion) {
    try {
      PublicRequest.validacionPublicacion(publicacion);      
      const publicacionCreada = await this.repository.crearPublicacion(publicacion);
      //verifico que la publicacion fue creada
      if (publicacionCreada) {
        //de ser asi guardara los datos correspondientes al usuario que crea la publicacion
        await this.servicioUsuario.guardarDatos(publicacionCreada);
      }
      return publicacion
    } catch (error) {
      throw new PublicacionRequestError("Error al crear publicación: " + error.message);
    }
  }

  async obtenerPublicacionPorId(idPublicacion) {
    const id = new ObjectId(idPublicacion);
    try {
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
    const id = new ObjectId(idPublicacion);
    try {
      PublicRequest.validacionPublicacion(nuevosDatos);
      const publicacionActualizada = await this.repository.actualizarPublicacion(id, nuevosDatos);
      return publicacionActualizada;
    } catch (error) {
      throw new PublicacionRequestError("Error al actualizar publicación: " + error.message);
    }
  }

  async eliminarPublicacion(idPublicacion) {
    const id = new ObjectId(idPublicacion);
    try {
      const publicacionEliminada = await this.repository.eliminarPublicacion(id);
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
