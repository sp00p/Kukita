const mongoose = require("mongoose");

let Schema = new mongoose.Schema({
  userID: String,
  xp: Number,
  level: Number
})

module.exports=mongoose.model("levels", Schema)
