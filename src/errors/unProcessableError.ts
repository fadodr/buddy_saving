import { ApiError } from './apiError';
import {
  ErrorDetailsDescriptor,
  ValidationErrorsParams,
  ValidationResult,
} from '../types';

const parseValidationErrors = (
  validationErrors: ValidationErrorsParams[]
): ValidationResult[] => {
  return validationErrors.map(({ path, type, message }) => {
    let fieldErrorCode = 'INVALID VALUE';
    if (type === 'any.required') {
      fieldErrorCode = 'MISSING VALUE';
    }

    return {
      code: fieldErrorCode,
      path: path.join('.'),
      message,
    };
  });
};

export class UnprocessableError extends ApiError {
  _statusCode = 422;
  _message: string;
  _details: ErrorDetailsDescriptor;

  constructor(validationErrors: ValidationErrorsParams[]) {
    super('Invalid Inputs');
    this._message = 'Invalid Inputs';

    this._details = {
      fields: parseValidationErrors(validationErrors),
    };

    Object.setPrototypeOf(this, UnprocessableError.prototype);
  }

  get statusCode() {
    return this._statusCode;
  }
  get message() {
    return this._message;
  }
  get details() {
    return this._details;
  }
}
