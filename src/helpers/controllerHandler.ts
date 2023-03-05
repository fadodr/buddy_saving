import { NextFunction, Request, Response } from 'express';
import {
  ControllerHandlerFn,
  ControllerArgs,
  ValidationSchema,
} from '../types';
import { AnyFunction } from 'sequelize/types/utils';
import { JoiValidate } from './joi';
import { UnprocessableError } from '../errors';

function parseControllerArgs(req: Request): ControllerArgs {
  return {
    input: req.body,
    params: req.params,
    query: req.query,
    files: req.files,
    user: req.user,
    headers: req.headers,
  };
}

export const controllerHandler = (
  controllerFn: AnyFunction,
  schema?: ValidationSchema | undefined
): ControllerHandlerFn => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const controllerArgs = parseControllerArgs(req);
    const { input, params, query } = controllerArgs;
    try {
      try {
        if (schema) {
          const { inputSchema, paramsSchema, querySchema } = schema;

          if (inputSchema) JoiValidate(inputSchema, input);
          if (paramsSchema) JoiValidate(paramsSchema, params);
          if (querySchema) JoiValidate(querySchema, query);
        }
      } catch (error: any) {
        throw new UnprocessableError(error.message);
      }

        const controllerResult = await controllerFn(req, res, next);
        
        if (!controllerResult) {
            res.status(200).send({ status: true });
            return;
        }

        const { code, ...data } = controllerResult;
        res.status(code ?? 200).send({
            status: true,
            message : data
        })
    } catch (error) {
        next(error);
    }
  };
};
