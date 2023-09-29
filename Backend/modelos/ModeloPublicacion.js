const ESTADOPUBLICACION = {
    ACTIVA: 'ACTIVA',
    CADUCADA: 'CADUCADA',
    CERRADA: 'CERRADA',
  };
  
  class Publicacion {
    constructor(titulo, idUsuario, idAnimal, idPublicacion) {
      this.fechaCreacion = new Date();
      this.fechaCaducidad = this.calcularFechaCaducidad();
      this.estadoPublicacion = ESTADOPUBLICACION.ACTIVA;
      this.titulo = titulo;
      this.idUsuario = idUsuario;
      this.idAnimal = idAnimal;
      this.idPublicacion = idPublicacion;
    }
    
    calcularFechaCaducidad() {
      const fechaCreacion = new Date(this.fechaCreacion);
      fechaCreacion.setDate(fechaCreacion.getDate() + 90);// Agrega 90 días a la fecha de creación
      return fechaCreacion;
    }

    getEstadoCaducidad(){
      const fechaActual=new Date()
      if(fechaActual>=this.fechaCaducidad){
        estado=ESTADOPUBLICACION.CADUCADA
      }
      return estado
    }

  }
  
  module.exports = { Publicacion, ESTADOPUBLICACION };