import AnimalRepository from "../repositorios/repositorioAnimal.js";
import { AnimalRequestError } from "../errores.js";

class ServicioAnimal {
  constructor() {
    this.repository = new AnimalRepository();
  }

  async crearAnimal(animal) {
    try {
      const nuevoAnimal = await this.repository.crearAnimal(animal);
      return nuevoAnimal;
    } catch (error) {
      throw new AnimalRequestError("Error al crear animal: " + error.message);
    }
  }

  async obtenerAnimalPorId(idAnimal) {
    try {
      const animal = await this.repository.obtenerAnimalPorId(idAnimal);
      if (!animal) {
        throw new AnimalRequestError(`Animal con ID ${idAnimal} no encontrado`);
      }
      return animal;
    } catch (error) {
      throw new AnimalRequestError("Error al obtener animal: " + error.message);
    }
  }

  async actualizarAnimal(idAnimal, nuevosDatos) {
    try {
      const animalActualizado = await this.repository.actualizarAnimal(idAnimal, nuevosDatos);
      return animalActualizado;
    } catch (error) {
      throw new AnimalRequestError("Error al actualizar animal: " + error.message);
    }
  }

  async eliminarAnimal(idAnimal) {
    try {
      const animalEliminado = await this.repository.eliminarAnimal(idAnimal);
      if (!animalEliminado) {
        throw new AnimalRequestError(`Animal con ID ${idAnimal} no encontrado`);
      }
      return animalEliminado;
    } catch (error) {
      throw new AnimalRequestError("Error al eliminar animal: " + error.message);
    }
  }
}

export default ServicioAnimal;
