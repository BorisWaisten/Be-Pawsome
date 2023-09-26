import mongoose from 'mongoose';

class ConexionMongo {
  constructor() {
    if (ConexionMongo.instance) {
      return ConexionMongo.instance;
    }

    this.url =
      'mongodb+srv://bepawsome:proyectbepawsome@cluster0.rk1ambn.mongodb.net/';
    ConexionMongo.instance = this;
    this.conectar();
  }

  async conectar() {
    try {
      const conexion = await mongoose.connect(this.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Conectado a la base de datos');
    } catch (error) {
      console.log('No se pudo conectar a la base de datos:', error);
    }
  }

  usuariosColeccion() {
    this.usuariosDB = mongoose.connection.collection('usuarios');
    return this.usuariosDB;
  }
}

export default ConexionMongo;
