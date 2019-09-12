const express = require("express")
const router = express.Router()

const postController = require("./../controllers/posts")
const authHelper = require("./../helpers/auth-helper")

router.post("/posts/add-post", authHelper.verifyToken, postController.addPost)

module.exports = router
