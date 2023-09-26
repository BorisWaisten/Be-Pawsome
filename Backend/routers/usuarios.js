import  express  from "express";
import ControladorUsuario from "../controladores/usuarios.js";

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

