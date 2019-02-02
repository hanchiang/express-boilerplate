const app = require('./app');
const redis = require('./redis');
const log = require('./utils/logging');

const env = process.env.NODE_ENV || 'development';
if (env === 'test' || 'development') {
  require('dotenv').config({ path: '.env.test' })
}

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  log.info('Express is running on port ' + port);
})