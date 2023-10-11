import ServicioUsuario from "../servicios/serviceUsuarios.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import pushEmail from '../helpers/emailPassword.js'
const SECRET_KEY = 'secretkey123';


class ControllerUsuario{

    constructor(){
        this.servicioUsuario = new ServicioUsuario()
    }

    register = async (req, res) => {
        const newUser = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            mail: req.body.mail,
            password: bcrypt.hashSync(req.body.password, 10),
            celular: req.body.celular,
            localidad: req.body.localidad,
            provincia: req.body.provincia,
            nacionalidad: req.body.nacionalidad,
            codigoPostal: req.body.codigoPostal
        }
        try {
            const user = await this.servicioUsuario.register(newUser);
            
            const expiresIn = 24 * 60 * 60;
            const accesToken = jwt.sign(
              {id: user._id},
              SECRET_KEY,
              {expiresIn : expiresIn}
            );

            const dataUser = {
              userRegistrado:user,
              accesToken: accesToken,
              expiresIn: expiresIn
            }

            res.status(200).json(dataUser);
        }
        catch (error) {
          res.status(401).json(error.message);
        }
      };

    login = async (req, res) => {
      const usuario = req.body;
      try {
        const user = await this.servicioUsuario.login(usuario);
        
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user._id }, SECRET_KEY, {
          expiresIn: expiresIn,
        });
    
        const dataUser = {
          userLogueado:user,
          accesToken: accesToken,
          expiresIn: expiresIn
        }
        
        
        res.status(200).json(dataUser);
      }catch(error){
        res.status(401).json(error.message);
      }
    }

    obtenerUsuario = async (req, res) => {
      const idUsuario = req.params.id;
      try {
        const user = await this.servicioUsuario.obtenerUsuario(idUsuario);
        res.status(200).json(user);
      } catch (error) {
        res.status(400).json(error.message);
      }
    }

    editarUsuario = async (req, res) => {
      const idUsuario = req.params.id;
      try {
        const user = await this.servicioUsuario.editarUsuario(idUsuario, req.body);
        res.status(200).json(user);
      }catch(error){
        res.status(400).json(error.message);
      }
    }

    eliminarUsuario = async (req, res) => {
      const idUsuario = req.params.id;
      try {
        const user = await this.servicioUsuario.eliminarUsuario(idUsuario);
        res.status(200).json(user);
      }catch(error){
        res.status(400).json(error.message);
      }
    }

    recuperarContrasenia = async (req, res) => {
      // del request deberan pasarse los datos del usuario: mail y la nueva contrasenia 
      const nuevoDatos = {
        mail: req.body.mail,
        password: bcrypt.hashSync(req.body.password, 10)
      }
      try {
        const user = await this.servicioUsuario.recuperarContrasenia(nuevoDatos);
        res.status(200).json(user);
      }catch(error){
        res.status(400).json(error.message);
      }
    }

    changePassword = async (req, res) => {
      try {
        const { mail } = req.body;
        // Busqueda del mail si existe o no 
        await this.servicioUsuario.changePassword(mail);

        const newPass = await pushEmail(mail);
        //guarda la nueva password generada
        await this.servicioUsuario.savePassword(mail, newPass);
        res.status(200).json({'message': `Se envio un mail a ${mail} con una nueva password generada. Te recomendamos cambiarla.`});
      } catch (error) {
        res.status(401).json(error.message);
      }


    }
}

export default ControllerUsuario