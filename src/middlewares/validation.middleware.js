const { ErrorResponse } = require("../utils/response.util");

const validateBody = (validator) => {
  return (req, res, next) => {
    const { error } = validator(req.body);
    if (error) {
      return new ErrorResponse(res).badRequest(error.message);
    }
    next();
  };
};

module.exports = validateBody;
