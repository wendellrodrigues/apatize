const mongoose = require("mongoose");

const CodeSchema = new mongoose.Schema({
  code: {
    type: String,
  },
});

module.exports = Code = mongoose.model("code", CodeSchema);
