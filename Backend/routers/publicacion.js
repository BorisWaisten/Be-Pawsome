import express from "express";
import ControladorPublicacion from "../controladores/controllerPublicacion.js";

class RouterPublicacion{
    constructor(){
        this.router = express.Router();
        this.controlador = new ControladorPublicacion();
    }

    start(){
        this.router.post("/anotacion", this.controlador.anotacion);
        //this.router.get('/register',this.controlador.getRegister);
        return this.router
    }

}