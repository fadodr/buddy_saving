import { ErrorDetailsDescriptor } from '../types';

export abstract class ApiError extends Error {
  abstract _statusCode: number;
  abstract _message: String;
  abstract _details: ErrorDetailsDescriptor | null;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;

    Object.setPrototypeOf(this, ApiError.prototype);
  }

  abstract get statusCode(): number;
  abstract override get message(): string;
  abstract get details(): ErrorDetailsDescriptor | null;
}
