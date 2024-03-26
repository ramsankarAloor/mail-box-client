const express = require('express')
const app = express();
const server = require("http").createServer(app);
require("dotenv").config();

const sequelize = require("./util/database");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth')

app.use("/auth", authRoutes);

sequelize
  .sync()
  .then(() =>
    server.listen(4000, () => console.log("server running at port 4000"))
  )
  .catch((err) => console.error(err));
