import { ApiError } from './apiError';
import { ErrorDetailsDescriptor } from '../types';

export class UnprocessableError extends ApiError {
  _statusCode = 422;
  _message: string;
  _details: ErrorDetailsDescriptor;

  constructor(details : ErrorDetailsDescriptor) {
    super('Invalid Input');
    this._message = 'Invalid Input';
      
      this._details = details;    

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
