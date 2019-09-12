const postValidator = require("./../validators/postValidator")
const HttpStatus = require("http-status-codes")
const postRepository = require("./../repository/postRepository")

module.exports = {
  addPost(req, res) {
    console.log("Cookie: ", req.cookies)
    console.log("User: ", req.user)

    const { error, value } = postValidator.validatePost(req.body)

    if (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.details })
    }

    postRepository.savePost(value, res)
  }
}
