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
            const validarEmail = await this.model.buscarEmail(usuario.mail)
            console.log(validarEmail);
            if (validarEmail){
              console.log("servicio2");
              throw new InvalidCredentialsError("El email " + usuario.mail + " ya se encuentra registrado!")
            } 
            return  await this.model.registro(usuario)
          } catch (error) {
            throw error;
          }
    }


}

export default ServicioUsuario