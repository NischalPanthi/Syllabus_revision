const mongoose = require("mongoose");

const ProgramSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  level: {
    type: String,
    required: true,
    //unique: true,
    default: "Bachelors"
  },
  
  imgString: {
    type: String,
    required: true,
  },
  programCode: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Program", ProgramSchema);
