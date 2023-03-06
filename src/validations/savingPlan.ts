import { Joi } from '../helpers';


export const createSavingPlanSchema = {
  inputSchema: Joi.object().keys({
    title : Joi.string().required(),
    numberOfBuddies: Joi.number().required(),
    isTarget: Joi.boolean().required(),
    isAutomatic: Joi.boolean().required(),
    frequency: Joi.string().required(),
    endOfYearSavingAmount: Joi.number(),
    numberOfMonthSaving: Joi.number().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    buddiesRelationship: Joi.string().required(),
  }),
};

export const initeUserSchema = {
    paramsSchema: Joi.object().keys({
        savingId: Joi.string().guid({ version : 'uuidv1'}),
    }),
    querySchema: Joi.object().keys({
        username : Joi.string().required()
    })
}

export const resolveInviteSchema = {
    paramsSchema: Joi.object().keys({
        token: Joi.string().required(),
    }),
    querySchema: Joi.object().keys({
        status: Joi.string().required(),
    }),
};