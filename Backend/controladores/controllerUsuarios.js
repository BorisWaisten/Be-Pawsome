import ServicioUsuario from "../servicios/serviceUsuarios.js";

class ControllerUsuario{

    constructor(){
        this.servicioUsuario = new ServicioUsuario()
    }

    register = async (req, res) => {
        const usuario = req.body
        try {
            const newUser = await this.servicioUsuario.register(usuario);
            res.status(200).json(newUser);
        }
        catch (error) {
          res.status(401).json(error.message);
        }
      };

    login = async (req, res) => {
      const usuario = req.body;
      try {
        const newUser = await this.servicioUsuario.login(usuario);
        res.status(200).json(newUser);
      }catch{
        res.status(401).json(error.message);
      }
    }
}

export default ControllerUsuario