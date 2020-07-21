const mongoose = require('mongoose')
let Schema = new mongoose.Schema({
  Guild: Number,
})
module.exports=mongoose.model("blacklist", Schema)
