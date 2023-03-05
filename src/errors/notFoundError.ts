import { ApiError } from "./apiError"

export class NotFoundError extends ApiError {
    _statusCode = 404;
    _message: string;
    _details = null;

    constructor(message : string) {
        super(message);
        this._message = message;

        Object.setPrototypeOf(this, NotFoundError.prototype);
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
