import ModelUsuario from "../repositorios/repositorioUser.js";
import UserRequest from "../validacionRequest/userRequest.js";
import { InvalidCredentialsError } from "../errores.js";
import bcrypt from 'bcrypt'

class ServicioUsuario{

    constructor(){
        this.model = new ModelUsuario()
    }

    register = async (usuario) =>{
      try{
        UserRequest.validacionRegister(usuario)
        const validarEmail = await this.model.buscarEmail(usuario.mail)
        if (validarEmail){
          throw new InvalidCredentialsError("El email " + usuario.mail + " ya se encuentra registrado!")
        } 
        return  await this.model.registro(usuario)
      }catch (error) {
        throw error;
      } 
      }

    login = async (usuario) =>{
      try{
        UserRequest.validacionLogin(usuario)
        const validarEmail = await this.model.buscarEmail(usuario.mail)
        if(!validarEmail){
          throw new InvalidCredentialsError("El email " + usuario.mail + " no se encuentra registrado!")
        }

        const user = await this.model.login(usuario)

        const isPasswordValid = bcrypt.compareSync(usuario.password, user.password)
        if(!isPasswordValid){
          throw new InvalidCredentialsError("Contraseña incorrecta")
        }

        return user
      }catch(error){
        throw error;
      }
    }

    changePassword = async (mail) => {
      try {
        const validarUser = await this.model.buscarEmail(mail)
        
        //Validacion de la existencia del mail
        if(!validarUser){
          //esto no deberia generar errores, deberian ser return con messages
          throw new InvalidCredentialsError("El email " + mail + " no se encuentra registrado!")
        }
        return validarUser;
      } catch (error) {
        throw error;
      }
    }

    savePassword = async (mail, newPassword) => {
      try {
        //aca deberiamos llamar al modelo para guardar la password
        const user = this.model.savePassword(mail, newPassword);
        return user;
      } catch (error) {
        throw error;
      }
    }

}

export default ServicioUsuario