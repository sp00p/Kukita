const mongoose = require("mongoose");

let Schema = new mongoose.Schema({
  userID: String,
  username: String,
  money: Number
})

module.exports=mongoose.model("money", Schema)
