import ModelUsuario from "../repositorios/repositorioUser.js";
import UserRequest from "../validacionRequest/userRequest.js";
import { InvalidCredentialsError,UsuarioNotFoundError } from "../errores.js";
import pushEmail from "../helpers/emailPassword.js";
import { ObjectId } from "mongodb";

const saltRounds = 10; // Número de rondas de sal (mayor es más seguro pero más lento)
import bcrypt from 'bcrypt'
import { log } from "console";

class ServicioUsuario{

    constructor(){
        this.model = new ModelUsuario()
    }

    idObjeto = (id) =>{
      return new ObjectId(id)
    }

    register = async (usuario) =>{
      try{

        await UserRequest.validacionRegister(usuario)

        const validarEmail = await this.model.buscarEmail(usuario.mail)
        if (validarEmail){
          throw new InvalidCredentialsError("El email " + usuario.mail + " ya se encuentra registrado!")
        }
        
        //Encripto la contrasenia 
        const contraseniaEncryptada = await bcrypt.hash(usuario.password, saltRounds)
        usuario.password = contraseniaEncryptada
        
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

    obtenerUsuario = async (idUsuario) =>{
      try{
        const user = await this.model.buscarId(this.idObjeto(idUsuario))
        if(!user){
          throw new UsuarioNotFoundError("El usuario no encontrado")
        }
        return user
      }catch(error){
        throw error
      }
    }

    editarUsuario = async (idUsuario, usuario) => {
      try {
        UserRequest.validacionEdit(usuario);
    
        const userEditado = await this.model.editarUsuario(this.idObjeto(idUsuario), usuario);
    
        if (!userEditado) {
          throw new UsuarioNotFoundError("El usuario no se pudo modificar");
        }
    
        return userEditado;
      } catch (error) {
        throw error;
      }
    };

    eliminarUsuario = async (idUsuario) =>{
      try{
        const userEliminado = await this.model.eliminarUsuario(this.idObjeto(idUsuario))
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

    changePassword = async (mail) => {
      try {
         // Valida que se ingrese un mail
        if(mail == null || mail.length === 0) throw new InvalidCredentialsError({'message': 'Error con el mail proporcionado'})
        const validarUser = await this.model.buscarEmail(mail)
        //Validacion de registro del mail
        if (!validarUser) throw new UsuarioNotFoundError("El email " + mail + " no se encuentra registrado!")
        //genero la nueva password
        const newPass = await pushEmail(mail);
        //guarda la nueva password
        await this.savePassword(mail, newPass);
      } catch (error) {
        throw error;
      }
    }

    savePassword = async (mail, newPassword) => {
      try {
        //aca deberiamos llamar al modelo para guardar la password
        const passwordEncrypted = await bcrypt.hash(newPassword, 10);
        const user = await this.model.savePassword(mail, passwordEncrypted);
        if(!user){
          throw new InvalidCredentialsError("No se pudo cambiar la contraseña")
        }
        return user;
      } catch (error) {
        throw error;
      }
    }


    guardarPublicacion = async (id,publicacion) =>{
      try {
        const user = await this.model.buscarId(this.idObjeto(id))
        if(!user){
          throw new UsuarioNotFoundError("El usuario no encontrado")
        }
        user.casita.publicaciones.push(publicacion)
        const userEditado = await this.model.editarUsuario(this.idObjeto(id), user);
        if(!userEditado){
          throw new UsuarioNotFoundError("El usuario no se pudo modificar");
        }
        return userEditado;
      } catch (error) {
        throw error
      }
    }

}

export default ServicioUsuario