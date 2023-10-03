import Joi from "joi";
import { ValidateError } from "../errores.js";

const validacionRegister = usuario => {
    const usuarioSchema = Joi.object({
        nombre: Joi.string().required(),
        apellido: Joi.string().required(),
        mail: Joi.string().email().required(),
        password: Joi.string().required(),
        celular: Joi.number().required(),
        localidad: Joi.string().required(),
        provincia: Joi.string().required(),
        nacionalidad: Joi.string().required(),
        codigoPostal: Joi.string().required()
    })
    const { error } = usuarioSchema.validate(usuario);
    if (error) throw new ValidateError(error.details[0].message);
}

const validacionLogin = usuario => {
    const usuarioSchema = Joi.object({
        mail: Joi.string().email().required(),
        password: Joi.string().required()
    })
    const { error } = usuarioSchema.validate(usuario);
    if (error) throw new ValidateError(error.details[0].message);
}

const validacionEdit = usuario => {
    const usuarioSchema = Joi.object({
        nombre: Joi.string().allow(''),
        apellido: Joi.string().allow(''),
        mail: Joi.string().email().allow(''),
        password: Joi.string().allow(''),
        celular: Joi.number().allow(''),
        localidad: Joi.string().allow(''),
        provincia: Joi.string().allow(''),
        nacionalidad: Joi.string().allow(''),
        codigoPostal: Joi.string().allow('')
    }).or('nombre', 'apellido', 'mail', 'password', 'celular', 'localidad', 'provincia', 'nacionalidad', 'codigoPostal');

    const { error } = usuarioSchema.validate(usuario);
    if (error) throw new ValidateError(error.details[0].message);
}

export default {validacionRegister,validacionLogin,validacionEdit}