import Joi from "joi";
import { ValidateError } from "../errores.js";

const validatePassword = (password) => {
  return Joi.string()
    .min(8)
    .regex(/^(?=.*[A-Z])(?=.*\d)/)
    .message('La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número')
    .validate(password);
};

const validacionRegister = async (usuario) => {
  try {
    const usuarioSchema = Joi.object({
      nombre: Joi.string().required(),
      apellido: Joi.string().required(),
      mail: Joi.string().email().required(),
      password: Joi.string().required().custom(validatePassword),
      celular: Joi.number().required(),
      localidad: Joi.string().required(),
      provincia: Joi.string().required(),
      nacionalidad: Joi.string().required(),
      codigoPostal: Joi.string().required(),
    });
    const { error, value } = usuarioSchema.validate(usuario);

    if (error) {
      throw new ValidateError(error.details[0].message);
    }
    return value;
  } catch (err) {
    throw new Error('Error al crear usuario: ' + err);
  }
};

const validacionLogin = (usuario) => {
  const usuarioSchema = Joi.object({
    mail: Joi.string().email().required(),
    password: Joi.string().required().custom(validatePassword),
  });
  const { error } = usuarioSchema.validate(usuario);
  if (error) throw new ValidateError(error.details[0].message);
};

const validacionEdit = (usuario) => {
  const usuarioSchema = Joi.object({
    nombre: Joi.string().allow(''),
    apellido: Joi.string().allow(''),
    password: Joi.string().allow('').custom(validatePassword),
    celular: Joi.number().allow(''),
    localidad: Joi.string().allow(''),
    provincia: Joi.string().allow(''),
    nacionalidad: Joi.string().allow(''),
    codigoPostal: Joi.string().allow(''),
  }).or('nombre', 'apellido', 'password', 'celular', 'localidad', 'provincia', 'nacionalidad', 'codigoPostal');

  const { error } = usuarioSchema.validate(usuario);
  if (error) throw new ValidateError(error.details[0].message);
};

export default { validacionRegister, validacionLogin, validacionEdit };
