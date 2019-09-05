const express = require("express")
const router = express.Router()

const authController = require("./../controllers/auth")

router.post("/register", authController.createUser)

module.exports = router
