const bcrypt = require("bcryptjs")
const HttpStatus = require("http-status-codes")
const User = require("./../models/user")

module.exports = {
  saveUser(value, res) {
    try {
      value.password = bcrypt.hashSync(value.password, 8)
    } catch (error) {
      res
        .send(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Could not encrypt password" })
    }

    User.create(value).then(
      result => {
        delete result.password
        console.log("RESULT: ", result)

        return res.send(result)
      },
      error => {
        console.log("Error saving user: ", error)
        if (error.code === 11000) {
          return res
            .status(HttpStatus.CONFLICT)
            .send({ message: "Email already exists" })
        } else {
          return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: "Error saving data" })
        }
      }
    )
  }
}
