class Usuario {
    constructor(nombre, apellido, mail,password , celular, localidad, provincia, nacionalidad, codigoPostal, imagenPerfil, esAdmin) {
      this.nombre = nombre;
      this.apellido = apellido;
      this.mail = mail;
      this.password = password;
      this.celular = celular;
      this.localidad = localidad;
      this.provincia = provincia;
      this.nacionalidad = nacionalidad;
      this.codigoPostal = codigoPostal;
      this.imagenPerfil = imagenPerfil;
      this.esAdmin = esAdmin;
    }
  }
export default Usuario;