const { default: mongoose } = require("mongoose");
const { PostMessage } = require("../models/postMessage");

const getPost = async (req, res) => {
  try {
    const postMessage = await PostMessage.find();
    console.log(postMessage);
    res.status(200).json(postMessage);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post With this id");

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });
  res.send(updatedPost);
};

const delitePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post With this id");

  await PostMessage.findByIdAndDelete(id);
  res.send({ message: "Delite Successfuly Done" });
};

const likePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post With this id");

  const post = await PostMessage.findById(id);

  const updatePost = await PostMessage.findByIdAndUpdate(
    id,
    {
      linkCount: post.linkCount + 1,
    },
    { new: true }
  );
  res.send(updatePost);
};

module.exports = { getPost, createPost, updatePost, delitePost, likePost };
