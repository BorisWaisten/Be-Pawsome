import ServicioUsuario from "../servicios/usuarios.js";

class ControllerUsuario{

    constructor(){
        this.servicioUsuario = new ServicioUsuario()
    }
}

export default ControllerUsuario