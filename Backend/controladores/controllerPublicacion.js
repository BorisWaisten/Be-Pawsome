import ServicioPublicacion from "../servicios/servicePublicacion.js";
import { PublicacionRequestError, PublicacionNotFoundError } from "../errores.js";

class ControllerPublicacion {
  constructor() {
    this.servicioPublicacion = new ServicioPublicacion();
  }

  crearPublicacion = async (req, res) => {
    const nuevaPublicacion = {
      titulo: req.body.titulo,
      idUsuario: req.body.idUsuario,
      idAnimal: req.body.idAnimal,
      idPublicacion: req.body.idPublicacion,
    };

    try {
      const publicacionCreada = await this.servicioPublicacion.crearPublicacion(nuevaPublicacion);
      res.status(201).json(publicacionCreada);
    } catch (error) {
      res.status(400).json(error.message);
    }
  };

  obtenerPublicacion = async (req, res) => {
    const idPublicacion = req.params.id;
    try {
      const publicacion = await this.servicioPublicacion.obtenerPublicacionPorId(idPublicacion);
      res.status(200).json(publicacion);
    } catch (error) {
      res.status(404).json(error.message);
    }
  };

  actualizarPublicacion = async (req, res) => {
    const idPublicacion = req.params.id;
    const nuevosDatos = req.body;
    try {
      const publicacionActualizada = await this.servicioPublicacion.actualizarPublicacion(idPublicacion, nuevosDatos);
      res.status(200).json(publicacionActualizada);
    } catch (error) {
      res.status(400).json(error.message);
    }
  };

  eliminarPublicacion = async (req, res) => {
    const idPublicacion = req.params.id;
    try {
      const publicacionEliminada = await this.servicioPublicacion.eliminarPublicacion(idPublicacion);
      if (!publicacionEliminada) {
        throw new PublicacionNotFoundError(`Publicación con ID ${idPublicacion} no encontrada`);
      }
      res.status(200).json(publicacionEliminada);
    } catch (error) {
      res.status(404).json(error.message);
    }
  };
}

export default ControllerPublicacion;
