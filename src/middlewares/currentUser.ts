import { RequestHandler } from 'express';
import { verifyToken } from '../helpers';
import { config } from '../configs';
import { ForbiddenError } from '../errors';
import { TokenUser } from '../types';

export const currentUser: RequestHandler = async (req, res, next) => {
  const tokenHeader = req.get('Authorization');

  if (!tokenHeader) {
    req.user = null;
    return next();
  }
  const token = tokenHeader.split(' ')[1];
  let tokenDetails;
  try {
    tokenDetails = verifyToken(token, config.accessTokenSecret);
  } catch (err: any) {
    req.user = null;
    const error = new ForbiddenError(err.message);
    return next(error);
  }

  const user: TokenUser = tokenDetails.user;
  req.user = user;
  next();
};