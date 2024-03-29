const Mail = require("../models/mail");
const User = require("../models/user");

exports.postMail = async (req, res) => {
  try {
    const { toEmail, subject, content } = req.body;
    const fromId = req.userId;
    const toId = await User.findOne({
      where: { email: toEmail },
      attributes: ['id'],
    });

    const mailObj = { fromId, toId : toId.dataValues.id , subject, content };
    await Mail.create(mailObj);
    res.status(201).json({message : "mail sent successfully!"})
  } catch (error) {
    res.status(500).json({ error : "server side error in sending mail"})
  }
};
