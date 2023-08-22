const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/auth.js");
const programRoute = require("./routes/program.js");
const subjectRoute = require("./routes/subject.js");
const path = require("path");
const cors = require("cors");
dotenv.config();
const mongodb="mongodb://127.0.0.1:27017/testoperations";

const app = express();
app.use(express.json());
app.use(cors());
app.use(
  "/program-image",
  express.static(path.join(__dirname, "ProgramImages"))
);
app.use(
  "/subject-image",
  express.static(path.join(__dirname, "SubjectImages"))
);
app.use("/subject-pdf", express.static(path.join(__dirname, "SubjectPdf")));
app.use("/api/auth", userRoute);
app.use("/api/program", programRoute);
app.use("/api/subject", subjectRoute);

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database is up and running");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(4000, () => {
  console.log("Server is up and running");
});
