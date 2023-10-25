import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
	SERVER_PORT: Joi.number().default(3005),
	MONGODB_CONNECTION: Joi.required(),
	POKEAPI_LIMIT: Joi.number().default(9),
});
