const log = require('../utils/logging');
const app = require('../app');

const env = process.env.NODE_ENV || 'development';
if (env === 'test' || 'development') {
  require('dotenv').config({ path: '.env.test' })
}

module.exports = () => {
  return new Promise((resolve, reject) => {
    const port = 3000;

    const server = app.listen(port, () => {
      log.info('Express is running on port ' + port);
      resolve(server);
    })
  })
}