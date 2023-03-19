const mongoose = require('mongoose')
const dotenv = require("dotenv")

dotenv.config()
const CONNECTION_URL = process.env.DATABASE
const connection = mongoose.connect(CONNECTION_URL);

module.exports = {connection}
