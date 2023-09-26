import ConexionMongo from "./conexionMongoDb.js";

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
            console.log(error);
        }
    }
}

export default RepositorioUser