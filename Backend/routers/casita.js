const express = require("express");
const ControladorCasita = require("../controladores/controladorCasita.js");

class RouterCasita {
  constructor() {
    this.router = express.Router();
    this.controladorCasita = new ControladorCasita();
  }

  start() {
    this.router.post("/agregar-publicacion/:idPublicacion", this.controladorCasita.agregarPublicacion);
    this.router.delete("/eliminar-publicacion/:idPublicacion", this.controladorCasita.eliminarPublicacion);
    this.router.put("/lo-adopte/:idAnimal", this.controladorCasita.loAdopte);
    return this.router;
  }
}

module.exports = RouterCasita;
