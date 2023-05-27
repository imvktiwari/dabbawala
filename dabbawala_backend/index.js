const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
//Connection
const DATABASE_URL = process.env.DB_URL;
const PORT = process.env.PORT || 5000;
//App
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const authRouter = require("./routes/auth");
// const postRouter = require("./routes/posts");

/* MONGOOSE CONNECT */
mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log("error connecting to mongodb" + err));


/* ROUTES */
app.use("", authRouter);


//PORT Connection
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}...`);
});


