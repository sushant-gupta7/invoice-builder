const joi = require("@hapi/joi");
module.exports = {
    validateSignUpSchema(body) {
    const schema = joi.object().keys({
      email: joi
        .string()
        .email()
        .required(),
      password: joi.string().required()
    });
    const { error, value } = schema.validate(body);
    if (error && error.details) {
        return {error}
    } 
    return {value};
  },
  validateForgotPasswordSchema(body) {
    const schema = joi.object().keys({
      email: joi
        .string()
        .email()
        .required()
    })

    const { error, value } = schema.validate(body);
    if (error && error.details) {
        return {error}
    } 
    return {value};
  }
};
