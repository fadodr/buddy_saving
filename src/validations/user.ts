import { Joi } from '../helpers';


export const createAccountSchema = {
    inputSchema: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),
        username: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string()
            .min(8)
            .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
            .required(),
    }),
};

export const loginSchema = {
    inputSchema: Joi.object().keys({
        email: Joi.string().required(),
        password : Joi.string().required()
    })
}