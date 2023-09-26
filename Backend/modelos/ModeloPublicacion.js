const ESTADOPUBLICACION = {
    ACTIVA: 'ACTIVA',
    CADUCADA: 'CADUCADA',
    CERRADA: 'CERRADA',
  };
  
  class Publicacion {
    constructor(fechaCreacion, fechaCaducidad, estadoPublicacion, titulo, idUsuario, idAnimal, idPublicacion) {
      this.fechaCreacion = fechaCreacion;
      this.fechaCaducidad = fechaCaducidad;
      this.estadoPublicacion = estadoPublicacion;
      this.titulo = titulo;
      this.idUsuario = idUsuario;
      this.idAnimal = idAnimal;
      this.idPublicacion = idPublicacion;
    }
  }
  
  module.exports = { Publicacion, ESTADOPUBLICACION };