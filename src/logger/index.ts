import prodLogger from './prodLogger';
import devLogger from './devLogger';

import { Logger } from 'winston';

let logger: Logger;

logger = process.env.NODE_ENV == 'development'
    ? devLogger() : prodLogger();

export default logger;
