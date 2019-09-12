const bcrypt = require("bcryptjs")
const HttpStatus = require("http-status-codes")
const User = require("./../models/user")
const jwt = require("jsonwebtoken")
const appConfig = require("./../config/app-config")

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
        if (error.errors || error.code === 11000) {
          return res.status(HttpStatus.CONFLICT).send(error.errors)
        } else {
          return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: "Error saving data" })
        }
      }
    )
  },

  async loginUser(value, res) {
    // check if user exists in system
    User.findOne({ email: value.email })
      .then(user => {
        if (user) {
          // check if password matches
          bcrypt
            .compare(value.password, user.password)
            .then(result => {
              // password match
              if (result) {
                // create a token
                const token = jwt.sign(
                  { data: user.toJSON() },
                  appConfig.secret,
                  {
                    expiresIn: 1 * 60 * 60
                  }
                )

                res.cookie("auth", token)
                return res.status(HttpStatus.OK).json({ token: token })
              } else {
                return res
                  .status(HttpStatus.UNAUTHORIZED)
                  .json({ message: "Password does not match" })
              }
            })
            .catch(error => {
              console.log("Error occrred during signing token: ", error)

              return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: "Error occurred: ", error })
            })
        } else {
          return res.status(HttpStatus.NOT_FOUND).json({
            message: "You are not registered on the platform, please sign up."
          })
        }
      })
      .catch(error => {
        console.log("Error occrred: ", error)

        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: "Error occurred: ", error })
      })
  }
}
