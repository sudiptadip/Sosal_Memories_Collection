const mongoosh = require("mongoose");

const userSchema = new mongoosh.Schema({
    name : {require: true, type: String},
    email : {require: true, type: String},
    password : {require: true, type: String},
})


const newusers = mongoosh.model("user", userSchema)

module.exports = {
    newusers
}