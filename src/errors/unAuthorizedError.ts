import { ApiError } from './apiError';

export class UnAuthorizedError extends ApiError {
  _statusCode = 401;
  _message: string;
  _details = null;

  constructor(message: string) {
    super(message);
    this._message = message;

    Object.setPrototypeOf(this, UnAuthorizedError.prototype);
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
