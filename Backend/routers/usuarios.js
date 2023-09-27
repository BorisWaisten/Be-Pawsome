import  express  from "express";
import ControladorUsuario from "../controladores/controllerUsuarios.js";

class RouterUsuario{
    constructor(){
        this.router = express.Router();
        this.controlador = new ControladorUsuario();
    }

    start(){
        this.router.post("/register", this.controlador.register);
        //this.router.get('/register',this.controlador.getRegister);
       // this.router.post("/login", this.controlador.login);
        //this.router.post("/logout", this.controlador.logout);
        return this.router
    }
}

export default RouterUsuario

