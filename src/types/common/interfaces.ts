import { FileArray } from 'express-fileupload';
import { IncomingHttpHeaders } from 'http';
import { ErrorDetailsDescriptor } from './types';

export interface ControllerArgs {
  input: any;
  params: any;
  query: any;
  files: FileArray | null | undefined;
  user: TokenUser | undefined | null;
  headers: IncomingHttpHeaders;
}

export interface ValidationSchema {
  inputSchema?: any;
  paramsSchema?: any;
  querySchema?: any;
}

export interface ErrorMessage {
  status: boolean;
  error: string;
  details?: ErrorDetailsDescriptor;
};

export interface TokenUser {
    id : string
};
