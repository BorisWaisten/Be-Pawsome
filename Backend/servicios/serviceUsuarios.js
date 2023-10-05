import ModelUsuario from "../repositorios/repositorioUser.js";
import UserRequest from "../validacionRequest/userRequest.js";
import { InvalidCredentialsError,UsuarioNotFoundError } from "../errores.js";
import bcrypt from 'bcrypt'
import { ObjectId } from "mongodb";

class ServicioUsuario{

    constructor(){
        this.model = new ModelUsuario()
    }

    idObjeto = (id) =>{
      return new ObjectId(id)
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
        const user = await this.model.login(usuario)
        if(!user){
          throw new InvalidCredentialsError("El email " + usuario.mail + " no se encuentra registrado!")
        }
        const isPasswordValid = bcrypt.compareSync(usuario.password, user.password)
        if(!isPasswordValid){
          throw new InvalidCredentialsError("Contraseña incorrecta")
        }
        return user
      }catch(error){
        throw error;
      }
    }

<<<<<<< HEAD
    obtenerUsuario = async (idUsuario) =>{
      try{
        const user = await this.model.buscarId(idObjeto(idUsuario))
        if(!user){
          throw new UsuarioNotFoundError("El usuario no encontrado")
        }
        return user
      }catch(error){
        throw error
      }
    }

    editarUsuario = async (idUsuario, usuario) =>{
      try{
        UserRequest.validacionEdit(usuario)
        const userEditado = await this.model.editarUsuario(idObjeto(idUsuario), usuario)
        if(!userEditado){
          throw new UsuarioNotFoundError("El usuario no se pudo modificar")
        }
        return userEditado 
      }catch(error){
        throw error
      }
    }

    eliminarUsuario = async (idUsuario) =>{
      try{
        const userEliminado = await this.model.eliminarUsuario(idObjeto(idUsuario))
        if(!userEliminado){
          throw new UsuarioNotFoundError("El usuario no eliminado")
        }
        return userEliminado 
      }catch(error){
        throw error
      }
    }

    recuperarContrasenia = async (nuevoDatos) =>{
      try {
        const user = await this.model.buscarEmail(nuevoDatos.mail)
        if(!user){
          throw new InvalidCredentialsError("El usuario no se encuentra registrado!")
        }
        const userRecuperado = await this.model.editarUsuario(user._id, nuevoDatos)
        if(!userRecuperado){
          throw new InvalidCredentialsError("No se pudo recuperar la contraseña!")
        }
        return userRecuperado
      } catch (error) {
        return error
      }
    }

=======
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
        console.log(newPassword + "1");
        //aca deberiamos llamar al modelo para guardar la password
        const passwordEncrypted = await bcrypt.hash(newPassword, 10);
        const user = await this.model.savePassword(mail, passwordEncrypted);
        return user;
      } catch (error) {
        throw error;
      }
    }
>>>>>>> mario

}

export default ServicioUsuario