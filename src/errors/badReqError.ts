import { ApiError } from './apiError';

export class BadReqError extends ApiError {
  _statusCode = 400;
  _message: string;
  _details = null;

  constructor(message: string) {
    super(message);
    this._message = message;

    Object.setPrototypeOf(this, BadReqError.prototype);
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
