class Casita {
    constructor() {
      this.publicaciones = [];
      this.animalesAdoptados = [];
    }
  
    agregarPublicacion(idPublicacion) {
      this.publicaciones.push(idPublicacion);
    }
  
    eliminarPublicacion(idPublicacion) {
      this.publicaciones = this.publicaciones.filter((id) => id !== idPublicacion);
    }
  
    loAdopte(idAnimal) {
      this.animalesAdoptados.push(idAnimal);
    }
  }
  
  export default Casita;
  