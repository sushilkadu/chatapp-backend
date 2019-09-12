const Joi = require("joi")

/**
 * Main aim is to validate if data is correctly passed to post method
 */

module.exports = {
  validatePost(body) {
    const schema = Joi.object().keys({
      post: Joi.string().required()
    })

    return Joi.validate(body, schema)
  }
}
