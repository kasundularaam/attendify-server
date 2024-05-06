require("express-async-errors");
const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
var multer = require("multer");
var upload = multer();
const app = express();

const batchRoute = require("./src/routes/batch.route");
const courseRoute = require("./src/routes/course.route");
const lectureRoute = require("./src/routes/lecture.route");
const studentRoute = require("./src/routes/student.route");
const lecturerRoute = require("./src/routes/lecturer.route");
const moduleRoute = require("./src/routes/module.route");
const universityRoute = require("./src/routes/university.route");
const attendanceRoute = require("./src/routes/attendance.route");

const notFoundMiddleware = require("./src/middlewares/notFound.middleware");

app.use("/static", express.static("static"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array("fieldName"));
// app.use(express.static("public"));

app.use(cors());

//connect DB
const connectDB = require("./src/services/db.service");

//routers

const {
  serverConfig,
  databaseConfig,
} = require("./config/environment_variables");

app.use("/api/batches", batchRoute);
app.use("/api/courses", courseRoute);
app.use("/api/lectures", lectureRoute);
app.use("/api/students", studentRoute);
app.use("/api/lecturers", lecturerRoute);
app.use("/api/modules", moduleRoute);
app.use("/api/universities", universityRoute);
app.use("/api/attendances", attendanceRoute);

app.use(notFoundMiddleware);

const start = async () => {
  try {
    await connectDB(databaseConfig.connectionString);
    app.listen(serverConfig.port, () =>
      console.log(
        `Server is listening on port http://localhost:${serverConfig.port}`
      )
    );
  } catch (error) {
    console.log(error);
  }
};
start();
