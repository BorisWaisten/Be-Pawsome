import express from "express";
import ControllerPublicacion from "../controladores/controllerPublicacion.js";
import ServicioPublicacion from "../servicios/servicePublicacion.js";

class RouterPublicacion {
  constructor() {
    this.router = express.Router();
    this.controlador = new ControllerPublicacion();
    this.servicioPublicacion = new ServicioPublicacion();
  }

  start() {
    this.router.post("/crear", this.controlador.crearPublicacion);
    this.router.get("/obtener/:id", this.controlador.obtenerPublicacion);
    this.router.put("/actualizar/:id", this.controlador.actualizarPublicacion);
    this.router.delete("/eliminar/:id", this.controlador.eliminarPublicacion);
    this.router.get("/publicaciones", this.controlador.publicaciones);
    this.router.get("/publicacionesUsuario/:id", this.controlador.publicacionesUsuario);
    this.router.get("/buscar", this.controlador.publicacionesPorString); //Aun necesito corregirlo, me thunderclient me devuelve  <pre>Cannot GET /publicacion/buscar</pre>
    return this.router;
  }
}

export default RouterPublicacion;
