const { Model } = require("sequelize");
const Mail = require("../models/mail");
const User = require("../models/user");

exports.postMail = async (req, res) => {
  try {
    const { toEmail, subject, content } = req.body;
    const fromId = req.userId;
    const toId = await User.findOne({
      where: { email: toEmail },
      attributes: ["id"],
    });

    const mailObj = { fromId, toId: toId.dataValues.id, subject, content };
    await Mail.create(mailObj);
    res.status(201).json({ message: "mail sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: "server side error in sending mail" });
  }
};

exports.getMails = async (req, res) => {
  try {
    const toId = req.userId;
    const mails = await Mail.findAll({
      where: { toId },
      include: [{ model: User, as: "from", attributes: ["email"] }],
      attributes: ["content", "subject", "read", "id"],
      order: [["id", "DESC"]]
    });
    res.status(200).json(mails);
  } catch (error) {
    res.status(500).json({ error: "server side error in getting inbox" });
  }
};

exports.getSentMails = async (req, res) => {
  try {
    const fromId = req.userId;
    const sentMails = await Mail.findAll({
      where: { fromId },
      include: [{ model: User, as: "to", attributes: ["email"] }],
      attributes: ["content", "subject", "id"],
      order: [["id", "DESC"]]
    });
    res.status(200).json(sentMails);
  } catch (error) {
    res.status(500).json({ error: "server side error in getting sent emails" });
  }
};

exports.readMail = async (req, res) => {
  const id = req.params.id;
  try {
    await Mail.update({ read: true }, { where: { id: id } });
    res.status(200).json({ message: "mail read" });
  } catch (error) {
    res.status(500).json({ error: "server side error to make mail read." });
  }
};

exports.deleteMail = async (req, res) => {
  const id = req.params.id;
  try {
    await Mail.destroy({ where: { id: id } });
    res.status(200).json({ message: "mail deleted" });
  } catch (error) {
    res.status.json({ error: "server side error in deleting mail" });
  }
};
