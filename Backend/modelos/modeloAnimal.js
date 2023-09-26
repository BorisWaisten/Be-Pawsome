 class Animal {
    constructor(nombre, fotos, edad, tipoAnimal, descripcion, sexo, pesoEnKg, ubicacion, oferente, adoptante, historiaClinica) {
      this.nombre = nombre;
      this.fotos = fotos;
      this.edad = edad;
      this.tipoAnimal = tipoAnimal;
      this.descripcion = descripcion;
      this.sexo = sexo;
      this.pesoEnKg = pesoEnKg;
      this.ubicacion = ubicacion;
      this.oferente = oferente;
      this.adoptante = adoptante;
      this.historiaClinica = historiaClinica;
    }
  }

  const TIPOANIMAL = {
    PERRO: 'PERRO',
    GATO: 'GATO',
    CONEJO: 'CONEJO',
    REPTIL: 'REPTIL',
    VACA: 'VACA',
    PEZ: 'PEZ',
  };
  
  module.exports = { Animal, TIPOANIMAL };