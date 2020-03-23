import joi from "@hapi/joi";
export default {
  validateInvoiceCreateSchema(body) {
    const schema = joi.object().keys({
      item: joi.string().required(),
      date: joi.date().required(),
      due: joi.date().required(),
      qty: joi.number().required(),
      tax: joi.number().optional(),
      rate: joi.number().optional(),
      client:joi.string().optional()
    });
    const { error, value } = schema.validate(body);
    if (error && error.details) {
        return {error}
    } 
    return {value};
  },
  validateInvoiceUpdateSchema(body) {
    const schema = joi.object().keys({
      item: joi.string().optional(),
      date: joi.date().optional(),
      due: joi.date().optional(),
      qty: joi.number().optional(),
      tax: joi.number().optional(),
      rate: joi.number().optional(),
      client: joi.string().optional()
    });
    const { error, value } = schema.validate(body);
    if (error && error.details) {
        return {error}
    } 
    return {value};
  },
};
