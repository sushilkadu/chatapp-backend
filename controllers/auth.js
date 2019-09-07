const userValidator = require("./../validators/userValidator")
const HttpStatus = require("http-status-codes")
const userRepository = require("./../repository/userRepository")

module.exports = {
  createUser(req, res) {
    const { error, value } = userValidator.validate(req.body)

    if (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.details })
    }

    userRepository.saveUser(value, res)
  },

  loginUser(req, res) {
    const { error, value } = userValidator.validateLogin(req.body)

    if (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.details })
    }

    userRepository.loginUser(value, res)
  }
}
