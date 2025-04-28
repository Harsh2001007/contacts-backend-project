const { constants } = require("./../constants");

const errorHandler = (error, req, resp, next) => {
  const statusCode = resp.statusCode ? resp.statusCode : 500;

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      resp.json({
        title: "Validation Failed",
        message: error.message,
        stackTrace: error.stack,
      });

    case constants.NOT_FOUND:
      resp.json({
        title: "Not Found",
        message: error.message,
        stackTrace: error.stack,
      });

    case constants.UNAUTHORIZED:
      resp.json({
        title: "Unauthorized",
        message: error.message,
        stackTrace: error.stack,
      });

    case constants.FORBIDDEN:
      resp.json({
        title: "Forbidden",
        message: error.message,
        stackTrace: error.stack,
      });

    case constants.SERVER_ERROR:
      resp.json({
        title: "Server Error",
        message: error.message,
        stackTrace: error.stack,
      });

    default:
      console.log("No error. All good ...");
  }
  resp.json({ message: error.message, stackTrace: error.stack });
};

module.exports = errorHandler;
