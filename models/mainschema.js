const mongoose = require("mongoose");

let Schema = new mongoose.Schema({
  userID: String,
  username: String,
  dailyCooldown: Number,
  weeklyCooldown: Number,
  workCooldown: Number,
  robCooldown: Number,
  money: Number,
  xp: Number,
  level: Number,
  isPassive: Boolean,
})

module.exports=mongoose.model("mainprofiles", Schema)
