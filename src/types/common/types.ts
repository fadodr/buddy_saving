import { NextFunction, Request, Response } from 'express';
import { boolean } from 'joi';

export type ControllerHandlerFn = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;