import ServicioUsuario from "../servicios/serviceUsuarios.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
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
              id: user._id,
              name: user.nombre,
              apellido: user.apellido,
              mail: user.mail,
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
          name:user.name,
          apellido:user.apellido,
          mail:user.mail,
          accessToken:accessToken,
          expiresIn:expiresIn
        }
        
        
        res.status(200).json(dataUser);
      }catch(error){
        res.status(401).json(error.message);
      }
    }
}

export default ControllerUsuario