const express = require("express")
const router = express.Router()

const postController = require("./../controllers/posts")

router.post("/posts/add-post", postController.addPost)

module.exports = router
