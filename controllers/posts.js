// const postValidator = require("./../validators/userValidator")
const HttpStatus = require("http-status-codes")
const postRepository = require("./../repository/postRepository")

module.exports = {
  addPost(req, res) {
    console.log("Inside add post")

    postRepository.savePost({}, res)
    // const { error, value } = userValidator.validateLogin(req.body)

    // if (error) {
    //   return res.status(HttpStatus.BAD_REQUEST).json({ message: error.details })
    // }

    // userRepository.loginUser(value, res)
  }
}
