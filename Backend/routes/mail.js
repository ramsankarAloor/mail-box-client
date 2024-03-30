const router = require("express").Router();
const { authenticateToken } = require("../middlewares/authenticateToken");
const { postMail, getMails, getSentMails } = require("../controllers/mail");

router.post("/send-mail", authenticateToken, postMail);
router.get("/get-mails", authenticateToken, getMails);
router.get("/sent-mails", authenticateToken, getSentMails);

module.exports = router;
