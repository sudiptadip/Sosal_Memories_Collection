const mongoosh = require("mongoose");

const postSchema = new mongoosh.Schema({
  title: String,
  message: String,
  creator: String,
  name: String,
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  createAt: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage = mongoosh.model("PostMessage", postSchema);

module.exports = { PostMessage };
