// catch all routes that don't exist
const notFound = (req, res, next) => {
  // The req.originalUrl property retains the original request URL
  // https://expressjs.com/en/5x/api.html#req.originalUrl
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// catch all errors that occur in existing routes
const errorHandler = (error, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = error.message;

  // if mongoose not found error, set to 404 and change message
  if (error.name === "CastError" && error.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }

  res
    .status(statusCode)
    .json({
      message,
      stack: process.env.NODE_ENV === "production" ? null : error.stack,
    });
};

export { notFound, errorHandler };
