class Usuario {
    constructor(nombre, apellido, mail, celular, localidad, provincia, nacionalidad, codigoPostal, imagenPerfil, esAdmin) {
      this.nombre = nombre;
      this.apellido = apellido;
      this.mail = mail;
      this.celular = celular;
      this.localidad = localidad;
      this.provincia = provincia;
      this.nacionalidad = nacionalidad;
      this.codigoPostal = codigoPostal;
      this.imagenPerfil = imagenPerfil;
      this.esAdmin = esAdmin;
    }
  }
  
  module.exports = Usuario;