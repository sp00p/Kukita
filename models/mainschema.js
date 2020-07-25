const mongoose = require("mongoose");

let Schema = new mongoose.Schema({
  userID: String,
  username: String,
  dailyCooldown: Number,
  weeklyCooldown: Number,
  workCooldown: Number,
  robCooldown: Number,
  cfCooldown: Number,
  diceCooldown: Number,
  rlCooldown: Number,
  slotsCooldown: Number,
  money: Number,
  currentXP: Number,
  nextLevel: Number,
  isVoter: Boolean,
  level: Number,
  isPassive: Boolean,
  rank: String,
})

module.exports=mongoose.model("mainprofiles", Schema)
