import express from "express";
import ControladorUsuario from "../controladores/controllerUsuarios.js";
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'secretkey123';

class RouterUsuario {
  constructor() {
    this.router = express.Router();
    this.controlador = new ControladorUsuario();
  }

  // Middleware para verificar el token de acceso
  verificarToken(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ mensaje: 'Acceso denegado. Token no proporcionado.' });
    }

    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = decoded;
      next();// Continuar la ejecución del controlador
    } catch (error) {
      return res.status(401).json({ mensaje: 'Token no válido.' });
    }
  }

  start() {
    // rutas de usuario en base a las peticiones que se realicen en el frontend

    this.router.post("/register",this.controlador.register);
    this.router.post("/login", this.controlador.login);
    this.router.get("/:id", this.controlador.obtenerUsuario);
    this.router.put("/:id", this.controlador.editarUsuario);
    this.router.delete("/:id", this.controlador.eliminarUsuario);
    this.router.post("/recuperarContrasenia", this.controlador.recuperarContrasenia);
    //posibles rutas que requieren autenticación
    // this.router.post("/perfil", this.verificarToken, this.controlador.obtenerPerfil);
    // this.router.post("/actualizar-perfil", this.verificarToken, this.controlador.actualizarPerfil);
    // Otras rutas que requieren autenticación...
    // this.router.post("/ruta1", this.verificarToken, this.controlador.funcion1);
    // this.router.post("/ruta2", this.verificarToken, this.controlador.funcion2);
    // this.router.post("/ruta3", this.verificarToken, this.controlador.funcion3);
    // Add more routes that require authentication...

    return this.router;
  }
}

export default RouterUsuario;
