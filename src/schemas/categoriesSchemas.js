import joi from 'joi';

const categoriesSchemas = joi.object({
    name: joi.string().required()
});

export default categoriesSchemas;