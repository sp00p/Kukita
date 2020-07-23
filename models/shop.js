const mongoose = require('mongoose');
let Schema = new mongoose.Schema({
  Guild: String,
  Items: { type: [ { Name: String, Price: Number } ] },
})

module.exports=mongoose.model("shops", Schema)
