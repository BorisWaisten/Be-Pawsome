import Joi from "joi";

const validacionRegister = usuario => {
    const usuarioSchema = Joi.object({
        nombre: Joi.string().required(),
        apellido: Joi.string().required(),
        mail: Joi.email().required(),
        celular: Joi.number.required(),
        localidad: Joi.string().required(),
        provincia: Joi.string().required(),
        nacionalidad: Joi.string().required(),
        codigoPostal: Joi.string().required()
    })
    const { error } = usuarioSchema.validate(usuario);
    if(error) throw new Error(error);
}

export default {validacionRegister}