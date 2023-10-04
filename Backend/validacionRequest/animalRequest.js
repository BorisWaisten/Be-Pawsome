import Joi from "joi";
import { ValidateError } from "../errores.js";

const validacionAnimal = animal => {
    const AnimalSchema = Joi.object({
        nombre: Joi.string().required(),
        fotos: Joi.array().items(Joi.string()).required(),
        edad: Joi.number().integer().required(),
        tipoAnimal: Joi.string().valid('PERRO', 'GATO', 'CONEJO', 'REPTIL', 'VACA', 'PEZ').insensitive().required(),
        descripcion: Joi.string().required(),
        sexo: Joi.string().required(),
        pesoEnKg: Joi.number().required(),
        ubicacion: Joi.string().required(),
        oferente: Joi.string().required(),
        historiaClinica: Joi.string().required()
    });

    const { error } = AnimalSchema.validate(animal, { allowUnknown: true });
    if (error) throw new ValidateError(error.details[0].message);
}

export default { validacionAnimal }
