import ServicioPublicacion from "../servicios/servicePublicacion.js";
import { PublicacionRequestError, PublicacionNotFoundError } from "../errores.js";
import emailAdoption from '../helpers/emailAdoption.js'

class ControllerPublicacion {
  constructor() {
    this.servicioPublicacion = new ServicioPublicacion();
  }

  crearPublicacion = async (req, res) => {
    // crear publicacion recibiria del request un titulo y dos objetos a guardar, el usuario y el animal
    const nuevaPublicacion = {
      titulo: req.body.titulo,
      usuario: req.body.usuario,
      animal: req.body.animal,
    };
    try {
      const publicacionCreada = await this.servicioPublicacion.crearPublicacion(nuevaPublicacion);
      // devolvemos el objeto publicacionCreada como respuesta
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

// va a devolver un array de todas las publicaciones de la base de datos
  publicaciones = async (req, res) => {
    try {
      const arrayPublicaciones = await this.servicioPublicacion.publicaciones();
      res.status(200).json(arrayPublicaciones);
    } catch (error) {
      res.status(404).json(error.message);
    }
  }

  //devolvera un array de las publicaciones de un usuario en especifico
  publicacionesUsuario = async (req, res) => {
    try {
      const idUser = req.params.id;
      const array = await this.servicioPublicacion.publicacionesUsuario(idUser);
      res.status(200).json(array)
    } catch (error) {
      res.status(404).json(error.message);
    }
  }

  //Se buscaran publicaciones por palabras claves (String recibidos por parametros)
  publicacionesPorString = async (req, res) => {
    try {
      const string = req.query.search;
      const result = await this.servicioPublicacion.publicacionesPorString(string);
      res.status(200).json(result)
    } catch (error) {
      res.status(404).json(error.message);
    }
  };

  // endpoint que responde al boton de 'Solicita Adopcion' 
  adoptar = async (req, res) => {
    try {
      const idAdoptante = req.body.idAdoptante;
      const idOferente = req.body.idUsuario;
      const fechaCreacion = req.body.fechaCreacion.$date;
      //dataAnimal es el objeto completo del animal, se envia asi para sacar sus propiedades para enviarselas al oferente por mail
      const dataAnimal = req.body.animal;
      // se guardara un array con dos users, en la posicion 0 sera el de la persona interesada en adoptar y en la posicion 1 el del oferente
      const users = await this.servicioPublicacion.adoptar(idAdoptante, idOferente);
      await emailAdoption(users, dataAnimal, fechaCreacion);
      res.status(200).json({"message:" : `Solicitud enviada a ${users[1].mail}`})
    } catch (error) {
      res.status(404).json(error.message);
    }
  };
}

export default ControllerPublicacion;
