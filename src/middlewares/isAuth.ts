import { RequestHandler } from 'express';
import { UnAuthorizedError } from '../errors';

export const isAuth: RequestHandler = async (req, res, next) => {
  if (!req.user) {
    const error = new UnAuthorizedError('You are not logged in');
    return next(error);
  }
  return next();
};