import ConexionMongo from "./conexionMongoDb.js";
import Usuario from "../modelos/modeloUsuarios.js"; 
import {DatabaseError} from "../errores.js";
import { ObjectId } from "mongoose";

class RepositorioUser{

    constructor(){
        this.usuariosCollection = null;
        this.init();
    }

    async init(){
        try{
            const conexionMongo = ConexionMongo.instance;
            if(conexionMongo){
                this.usuariosCollection = await conexionMongo.usuariosColeccion();
            }else{
                const nuevaConexionMongo = new ConexionMongo();
                await nuevaConexionMongo.conectar();
                this.usuariosCollection = nuevaConexionMongo.usuariosColeccion();
            }
        }catch(error){
            throw new DatabaseError(error)
        }
    }

    async registro(usuario){
        try{
            const newUser = new Usuario(
                usuario.nombre, usuario.apellido, usuario.mail, 
                usuario.password,usuario.celular, 
                usuario.localidad, usuario.provincia, 
                usuario.nacionalidad,usuario.codigoPostal)
                ;
                await this.usuariosCollection.insertOne(newUser);
            return newUser;
        }catch(error){
            throw new DatabaseError("Error al registrar usuario: " + error);
        }
    }

    async login(usuario){
        try{
            const user = await this.usuariosCollection.findOne({ mail: usuario.mail});
            return user;
        }catch(error){
            throw new DatabaseError("Error al loguear usuario: " + error);
        }
    }

    async buscarEmail(mail){
        return await this.usuariosCollection.findOne({ mail: mail });
    }

    async buscarId(id){
        try{
            const user = await this.usuariosCollection.findOne({ _id: id });
            return user
        }catch(error){
            throw new DatabaseError("Error al buscar usuario: " + error);
        }
    }

    async editarUsuario(id, usuario){
        try{
            const userEditado = await this.usuariosCollection.updateOne({ _id: id }, { $set: usuario });
            return userEditado 
        }catch(error){
            throw new DatabaseError("Error al editar usuario: " + error);
        }
    }

    async eliminarUsuario(id){
        try{
            const userEliminado = await this.usuariosCollection.deleteOne({ _id: id });
            return userEliminado 
        }catch(error){
            throw new DatabaseError("Error al eliminar usuario: " + error);
        }
    //se le cambia la pass por la pasada por parametros
    }
    async savePassword(mail, newPassword){
        try {
            const usuarioEditado = await this.usuariosCollection.updateOne({ mail }, { $set: { password: newPassword } });
            return usuarioEditado;
        } catch (error) {
            throw new DatabaseError("Error al editar contraseña: " + error);
        }
    }

    async guardarDatos(publicacion){
        const id=new ObjectId(publicacion.usuario._id );
        try{
            const user = await this.usuariosCollection.findOne({ _id: id },{
                 $push: {misPublicaciones: publicacion},
                 $push: {misAnimales: publicacion.animal} });
            return user
        }catch(error){
            throw new DatabaseError("Error al buscar usuario: " + error);
        }
    }
}

export default RepositorioUser