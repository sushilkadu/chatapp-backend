const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  post: { type: String, required: true },
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      comment: { type: String, required: true },
      createdAd: { type: Date, default: Date.now() }
    }
  ],
  totalLikes: { type: Number, default: 0 },
  likes: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    }
  ],
  createdAd: { type: Date, default: Date.now() }
})

module.exports = mongoose.model("Post", postSchema)
