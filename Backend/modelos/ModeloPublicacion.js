const ESTADOPUBLICACION = {
    ACTIVA: 'ACTIVA',
    CADUCADA: 'CADUCADA',
    CERRADA: 'CERRADA',
  };
  
  class Publicacion {
    constructor(titulo, idUsuario, animal) {
      this.fechaCreacion = new Date();
      this.fechaCaducidad = this.calcularFechaCaducidad();
      this.estadoPublicacion = ESTADOPUBLICACION.ACTIVA;
      this.titulo = titulo;
      this.idUsuario = idUsuario;
      this.animal = animal;
    }

    
    calcularFechaCaducidad() {
      const fechaCreacion = new Date(this.fechaCreacion);
      fechaCreacion.setDate(fechaCreacion.getDate() + 90);// Agrega 90 días a la fecha de creación
      return fechaCreacion;
    }
    
  }
  
  export default Publicacion;