import joi from 'joi';

const rentalsSchemas=joi.object({
    customerId: joi.number().required(),
    gameId: joi.number().required(),
    daysRented: joi.number().required()
});

export default rentalsSchemas;