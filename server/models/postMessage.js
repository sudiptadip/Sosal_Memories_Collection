const mongoosh = require("mongoose");

const postSchema = new mongoosh.Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  linkCount: {
    type: Number,
    default: 0,
  },
  createAt: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage = mongoosh.model("PostMessage", postSchema);

module.exports = { PostMessage };
