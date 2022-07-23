import joi from 'joi';

const customersSchemas = joi.object({
    name: joi.string().required(),
    phone: joi.string().required(),
    cpf: joi.string().required(),
    birthday: joi.string().required()
});

export default customersSchemas;