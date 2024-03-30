const express = require('express')
const app = express();
const server = require("http").createServer(app);
require("dotenv").config();

const sequelize = require("./util/database");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth')
const mailRoutes = require('./routes/mail')
const Mail = require('./models/mail')
const User = require('./models/user')

app.use("/auth", authRoutes);
app.use("/mail", mailRoutes); 

Mail.belongsTo(User, { foreignKey: 'fromId', as: 'from'});
Mail.belongsTo(User, { foreignKey: 'toId', as: 'to'});

sequelize
  .sync()
  .then(() =>
    server.listen(4000, () => console.log("server running at port 4000"))
  )
  .catch((err) => console.error(err));
