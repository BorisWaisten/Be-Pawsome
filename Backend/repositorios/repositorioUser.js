import ConexionMongo from "./conexionMongoDb.js";
import Usuario from "../modelos/modeloUsuarios.js";
import Default from "../recursosDefault/recursosDefault.js"
import {DatabaseError} from "../errores.js";

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
            if(usuario.imagenPerfil === ""){
                usuario.imagenPerfil = Default.perfilDefault1;
            }
            const newUser = new Usuario(usuario.nombre, usuario.apellido, usuario.mail, 
                usuario.password,usuario.celular, usuario.localidad, usuario.provincia, usuario.nacionalidad, 
                usuario.codigoPostal, usuario.imagenPerfil, false);
                await this.usuariosCollection.insertOne(newUser);
            return newUser;
        }catch(error){
            throw new DatabaseError("Error al registrar usuario: " + error);
        }
    }

    async buscarEmail(mail){
        return await this.usuariosCollection.findOne({ mail: mail });
    }
    
    async buscarUsername(nombre,apellido){
      return await this.usuariosCollection.findOne({ nombre: nombre, apellido: apellido });
    }

}

export default RepositorioUser