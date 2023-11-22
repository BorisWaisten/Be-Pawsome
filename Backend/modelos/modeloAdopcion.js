class Adopcion {
    constructor(idOferente, idAdoptante, publicacion) {
      this.idOferente = idOferente;
      this.idAdoptante = idAdoptante;
      this.idAnimal = publicacion.idAnimal;
      this.fechaAdopcion = new Date().getDate;
    }
  }

export default  Adopcion 