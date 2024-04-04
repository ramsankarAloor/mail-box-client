const sequelize = require("../util/database");
const { DataTypes } = require("sequelize");

const Mail = sequelize.define("mail", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  fromId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  toId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  subject: {
    type: DataTypes.STRING,
  },
  content: {
    type: DataTypes.STRING,
  },
  read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  senderDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  receiverDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Mail;
