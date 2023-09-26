import ModelUsuario from "../repositorios/repositorioUser.js";
class ServicioUsuario{

    constructor(){
        this.model = new ModelUsuario()
    }
}

export default ServicioUsuario