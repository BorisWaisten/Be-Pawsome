import Joi from "joi";
import { ValidateError } from "../errores.js";

const validacionPublicacion = publicacion => {
    const publicacionSchema = Joi.object({
        titulo: Joi.string().required(),
        idUsuario: Joi.number().required(),
        idAnimal: Joi.number().required()
    })
    const { error } = publicacionSchema.validate(publicacion);
    if (error) throw new ValidateError(error.details[0].message);
}

export default {validacionPublicacion}