const Joi = require("joi")

/**
 * Main aim is to validate if data is correctly passed to register method
 */

module.exports = {
  validate(body) {
    const schema = Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(4)
        .required()
    })

    return Joi.validate(body, schema)
  },

  validateLogin(body) {
    const schema = Joi.object().keys({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(4)
        .required()
    })

    return Joi.validate(body, schema)
  }
}
