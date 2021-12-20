const errorHandler = async (err, req, res, next) => {
  // console.log(err);

  let status = 500;
  let message = "Internal Server Error";

  if (err.name === "MulterError") {
    statusCode = 413;
    message = "File to large";
  }
  else if (
    err.name === 'SequelizeValidationError'
    || err.name === 'SequelizeUniqueConstraintError'
    || err.name === 'BAD_REQUEST'
  ) {
    status = 400;
    message = err.errors ? err.errors.map(el => el.message) : "Bad Request";
  }
  else if (
    err.name === 'JsonWebTokenError'
    || err.name === 'NOT_AUTHORIZE'
  ) {
    status = 401;
    message = "Not Authorize !";
  }
  else if (err.name === 'INVALID') {
    status = 401;
    message = 'Email / Password Invalid';
  }
  else if (err.name === 'INVALID_EMAIL') {
    status = 401;
    message = 'Email is required';
  }
  else if (err.name === 'INVALID_PASSWORD') {
    status = 401;
    message = 'Password is required';
  }
  else if (err.name === "FORBIDDEN") {
    status = 403;
    message = "Forbidden Access";
  }
  else if (err.name === "NOT_FOUND") {
    status = 404;
    message = 'Not Found !';
  } else if (err.name === "USER_NOT_FOUND") {
    status = 404
    message = 'Email Not Found !'
  } else if (err.name === "ORGANIZATION_FAIL") {
    status = 404
    message = 'Organization Not Found !'
  }

  res.status(status).json({
    message
  })

  next();
}

module.exports = errorHandler