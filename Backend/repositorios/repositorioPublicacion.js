import ConexionMongo from "./conexionMongoDb.js";
import Publicacion from "../modelos/modeloPublicacion.js";
import { DatabaseError } from "../errores.js";

class RepositorioPublicacion {
  constructor() {
    this.publicacionesCollection = null;
    this.init();
  }

  async init() {
    try {
      const conexionMongo = ConexionMongo.instance;
      if (conexionMongo) {
        this.publicacionesCollection = await conexionMongo.PublicacionesColeccion();
      } else {
        const nuevaConexionMongo = new ConexionMongo();
        await nuevaConexionMongo.conectar();
        this.publicacionesCollection = nuevaConexionMongo.PublicacionesColeccion();
      }
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  async crearPublicacion(publicacion) {
    try {
      const nuevaPublicacion = new Publicacion(
        publicacion.titulo,
        publicacion.idUsuario,
        publicacion.idAnimal,
      );
       await this.publicacionesCollection.insertOne(nuevaPublicacion);
      return nuevaPublicacion; 
    } catch (error) {
      throw new DatabaseError("Error al crear publicación: " + error);
    }
  }

  async obtenerPublicacionPorId(id) {
    return await this.publicacionesCollection.findOne({ _id: id });
  }

  async actualizarPublicacion(id, nuevosDatos) {
    try {
      await this.publicacionesCollection.updateOne({ _id: id }, { $set: nuevosDatos });
      return await this.obtenerPublicacionPorId(id);
    } catch (error) {
      throw new DatabaseError("Error al actualizar publicación: " + error);
    }
  }

  async eliminarPublicacion(id) {
    try {
      const publicacionEliminada = await this.publicacionesCollection.deleteOne({ _id: id });
      return publicacionEliminada;
    } catch (error) {
      throw new DatabaseError("Error al eliminar publicación: " + error);
    }
  }
}

export default RepositorioPublicacion;