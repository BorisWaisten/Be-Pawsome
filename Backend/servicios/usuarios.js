import ModelUsuario from "../repositorios/repositorioUser.js";
import UserRequest from "../validacionRequest/userRequest.js";
import { InvalidCredentialsError } from "../errores.js";

class ServicioUsuario{

    constructor(){
        this.model = new ModelUsuario()
    }

    register = async (usuario) =>{
        try{
            UserRequest.validacionRegister(usuario)
            console.log("servicio1");
            const validarEmail = await this.model.buscarEmail(usuario.email)
            console.log("servicio1");
            const validarUsername = await this.model.buscarUsername(usuario.nombre, usuario.apellido)
            console.log("servicio1");
            if (validarEmail){
              throw new InvalidCredentialsError("El email " + usuario.email + " ya se encuentra registrado!")
            } 
            if (validarUsername) {
              throw new InvalidCredentialsError("El username " + usuario.nombre+" "+ usuario.apellido + " ya se encuentra registrado!")
            }
            return  await this.model.registro(usuario)
          } catch (error) {
            throw error;
          }
    }


}

export default ServicioUsuario