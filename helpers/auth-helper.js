const jwt = require("jsonwebtoken")
const appConfig = require("./../config/app-config")
const HttpStatus = require("http-status-codes")

module.exports = {
  verifyToken: (req, res, next) => {
    console.log("Headers: ", req.headers)

    if (!req.headers.authorization && !req.cookies.auth) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: "Please add Authorization" })
    }

    // check if token is available in request
    const token = req.cookies.auth || req.headers.authorization.split(" ")[1]

    if (!token) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: "Token not provided" })
    }

    // check if token is valid
    return jwt.verify(token, appConfig.secret, (err, decoded) => {
      if (err) {
        if (err.expiredAt < new Date()) {
          return res
            .status(HttpStatus.UNAUTHORIZED)
            .json({ message: "Token is expired" })
        }
        next()
      }

      req.user = decoded.data
      next()
    })
  }
}
