import { ErrorRequestHandler } from 'express';
import { ApiError } from '../errors';
import { ErrorMessage } from '../types';

export const errorMiddleware: ErrorRequestHandler = (error, req, res, next) => {
    let statusCode = 500;
    let message = 'Something went wrong';
    let details = null;

    if (error instanceof ApiError) {
        statusCode = error.statusCode;
        message = error.message;
        details = error.details;
    }
    else {
        console.log(error.message);
    }

    let errorMsg : ErrorMessage  = {
        status: false,
        error: message,
    };

    if (details) {
        errorMsg = {
            ...errorMsg,
            details
        }
    };

    res.status(statusCode).send(errorMsg);
};
