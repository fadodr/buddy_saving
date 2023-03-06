import http from 'http';

import app from './app';
import { config, sequelize } from './configs';
import logger from './logger';
const port = config.port;

const server = http.createServer({}, app);

sequelize
  .sync()
  .then(() => {
    logger.info('database connected successfully');
    server.listen(port, () => {
      logger.info(`server is now running on port ${port}`);
    });
  })
  .catch((error) => {
    logger.error(error);
  });
