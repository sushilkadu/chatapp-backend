const HttpStatus = require("http-status-codes")
module.exports = {
  savePost(value, res) {
    return res.status(HttpStatus.OK).json({ tested: "Ok" })
  }
}
