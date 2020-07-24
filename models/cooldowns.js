const mongoose = require("mongoose");

let Schema = new mongoose.Schema({
  serverID: String,
  userID: String,
  command: String,
  cooldown: Number
})

module.exports=mongoose.model("cooldown", Schema)
