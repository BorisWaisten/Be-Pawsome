import ServicioPublicacion from "../servicios/servicePublicacion.js";

class ControllerPublicacion{
    constructor(){
        this.servicioPublicacion = new ServicioPublicacion();
    }

    anotacion = async (req, res) => {
        
    }
}

export default ControllerPublicacion