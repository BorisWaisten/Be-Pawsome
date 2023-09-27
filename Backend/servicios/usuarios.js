import ModelUsuario from "../repositorios/repositorioUser.js";
class ServicioUsuario{

    constructor(){
        this.model = new ModelUsuario()
    }

    registro = async (usuario) =>{
        try{
            validarBodyRegister(usuario)



            return await this.model.registro(usuario)
        }catch(error){
            console.log(error)
        }
    }

}

export default ServicioUsuario