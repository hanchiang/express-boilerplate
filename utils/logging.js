const bunyan = require('bunyan');
const bunyanExpressSerializer = require('bunyan-express-serializer');

exports.logger = bunyan.createLogger({
  name: 'my-app',
  serializers: {
    err: bunyanExpressSerializer,
    req: bunyan.stdSerializers.req,
    res: bunyan.stdSerializers.res
  },
  level: 'info'
});

exports.logResponse = (id, body) => {
  const log = this.loggerInstance.child({
    id,
    body
  }, true);
  log.info('response');
};

// Disable logging when running tests
if (process.env.NODE_ENV === 'test') {
  this.loggerInstance.level(bunyan.FATAL + 1);
}
