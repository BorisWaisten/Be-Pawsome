import ConexionMongo from "./conexionMongoDb.js";
import Animal from "../modelos/modeloAnimal.js";
import { DatabaseError } from "../errores.js";

class RepositorioAnimal {
  constructor() {
    this.animalesCollection = null;
    this.init();
  }

  async init() {
    try {
      const conexionMongo = ConexionMongo.instance;
      if (conexionMongo) {
        this.animalesCollection = await conexionMongo.animalesColeccion();
      } else {
        const nuevaConexionMongo = new ConexionMongo();
        await nuevaConexionMongo.conectar();
        this.animalesCollection = nuevaConexionMongo.animalesColeccion();
      }
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  async crearAnimal(animal) {
    try {
      const nuevoAnimal = new Animal(
        animal.nombre,
        animal.fotos,
        animal.edad,
        animal.tipoAnimal,
        animal.descripcion,
        animal.sexo,
        animal.pesoEnKg,
        animal.ubicacion,
        animal.oferente,
        animal.adoptante,
        animal.historiaClinica
      );

      await this.animalesCollection.insertOne(nuevoAnimal);
      return nuevoAnimal;
    } catch (error) {
      throw new DatabaseError("Error al crear animal: " + error);
    }
  }

  async obtenerAnimalPorId(id) {
    return await this.animalesCollection.findOne({ _id: id });
  }

  async actualizarAnimal(id, nuevosDatos) {
    try {
      await this.animalesCollection.updateOne({ _id: id }, { $set: nuevosDatos });
      return await this.obtenerAnimalPorId(id);
    } catch (error) {
      throw new DatabaseError("Error al actualizar animal: " + error);
    }
  }

  async eliminarAnimal(id) {
    try {
      const animalEliminado = await this.obtenerAnimalPorId(id);
      await this.animalesCollection.deleteOne({ _id: id });
      return animalEliminado;
    } catch (error) {
      throw new DatabaseError("Error al eliminar animal: " + error);
    }
  }
}

export default RepositorioAnimal;
