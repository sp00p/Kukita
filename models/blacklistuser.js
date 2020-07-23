const mongoose = require('mongoose')
let Schema = new mongoose.Schema({
  userID: Number,
})
module.exports=mongoose.model("blacklistuser", Schema)
