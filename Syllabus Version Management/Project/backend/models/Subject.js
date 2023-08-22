const mongoose = require("mongoose");
const {format} =require("date-fns");

const SubjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    /*imgString: {
      type: String,
      required: false,
    },*/
    semester: {
      type: String,
      required: true,
    },
    subjectCode: {
      type: String,
      required: true,
      // unique: true,
    },
    parentProgramCode: {
      type: Array,
      required: true,
    },
    syllabus: [
      {
        type: new mongoose.Schema(
          {
            pdf: String,
            version: String,
          },
          { timestamps: true }
        ),
      },
    ],
  },
  { timestamps: true }
);

const Subject = mongoose.model("Subject", SubjectSchema);

module.exports = Subject;
