const log = require('../utils/logging');

exports.catchErrors = (fn) => {
  return function(req, res, next) {
    fn(req, res, next).catch(next);
  }
}

exports.notFound = (req, res, next) => {
  const err = new Error(`${req.path} can't be found`);
  err.status = 404;
  next(err);
};

exports.productionErrors = (err, req, res, next) => {
  log.error({ err });
  const error = {
    type: err.name,
    msg: err.message
  };
  if (process.env.NODE_ENV === 'development') {
    error.stack = err.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>');
  }
  res.status(err.status || 500).json({ error });
}