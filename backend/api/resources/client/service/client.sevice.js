const joi = require("@hapi/joi");
module.exports=  {
  validateClientCreateSchema(body) {
    const schema = joi.object().keys({
      firstName: joi.string().required(),
      lastName: joi.string().required(),
      email: joi
        .string()
        .email()
        .required(),
      mobile: joi.string().required()
    });
    const { error, value } = schema.validate(body);
    if (error && error.details) {
        return {error}
    } 
    return {value};
  },
  validateClientUpdateSchema(body) {
    const schema = joi.object().keys({
      firstName: joi.string().optional(),
      lastName: joi.string().optional(),
      email: joi
        .string()
        .email()
        .optional(),
      mobile: joi.string().optional()
    });
    const { error, value } = schema.validate(body);
    if (error && error.details) {
        return {error}
    } 
    return {value};
  }
};
