const mongoose = require("mongoose");

let Schema = new mongoose.Schema({
  serverID: String,
  prefix: String,
})

module.exports=mongoose.model("prefix", Schema)
