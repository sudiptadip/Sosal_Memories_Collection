const { default: mongoose } = require("mongoose");
const { PostMessage } = require("../models/postMessage");

const getPost = async (req, res) => {
  const {page} = req.query
  try {
    const Limit = 6
    const startIndex = (Number(page) - 1) * Limit
    const total = await PostMessage.countDocuments({});

    const posts = await PostMessage.find().sort({_id: -1}).limit(Limit).skip(startIndex)

    res.status(200).json({data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total/Limit)});
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

const getPostBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");
    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });
    res.send({data: posts})
  } catch (error) {
    res.send(error.message)
  }
};
 
const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createAt: new Date().toISOString(),
  });
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

  if (!req.userId) return res.send({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post With this id");

  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatePost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.send(updatePost);
};

const getSinglePost = async (req,res) => {
  const {id} = req.params
  try {
    const post = await PostMessage.findById(id)
    res.status(200).json(post)
  } catch (error) {
    res.status(404).send({message: error.message})
  }
}


module.exports = {
  getPostBySearch,
  getPost,
  createPost,
  updatePost,
  delitePost,
  likePost,
  getSinglePost,
};
