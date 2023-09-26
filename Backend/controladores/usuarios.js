import ServicioUsuario from "../servicios/usuarios.js";

class ControladorUsuario{

    constructor(){
        this.servicioUsuario = new ServicioUsuario()
    }
}

export default ControladorUsuario