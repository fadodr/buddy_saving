import { FileArray } from 'express-fileupload';
import { IncomingHttpHeaders } from 'http';

export interface ControllerArgs {
  input: any;
  params: any;
  query: any;
  files: FileArray | null | undefined;
  user: TokenUser | undefined | null;
  headers: IncomingHttpHeaders;
}

export interface ErrorDetailsDescriptor {
  fields: Array<{ code: string; path: string }>;
}

export interface ValidationErrorsParams {
  path: string[];
  type: string;
  message: string;
  context: { label: string; key: string };
}

export interface ValidationResult {
  code: string;
  path: string;
  message: string;
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
