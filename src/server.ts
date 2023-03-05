import http from 'http';

import app from './app';
import { config, sequelize } from './configs';
const port = config.port;

const server = http.createServer({}, app);

sequelize
  .sync({ force: true })
  .then(() => {
    console.log('database connected successfully');
    server.listen(port, () => {
      console.log(`server is now running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
