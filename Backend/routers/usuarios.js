import  express  from "express";
import ControladorUsuario from "../controladores/controllerUsuarios.js";

class RouterUsuario{
    constructor(){
        this.router = express.Router();
        this.controlador = new ControladorUsuario();
    }

    start(){
        return this.router
    }
}

export default RouterUsuario

