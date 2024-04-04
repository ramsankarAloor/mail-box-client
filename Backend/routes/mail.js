const router = require("express").Router();
const { authenticateToken } = require("../middlewares/authenticateToken");
const { postMail, getMails, getSentMails, readMail, deleteMail } = require("../controllers/mail");

router.post("/send-mail", authenticateToken, postMail);
router.get("/get-mails", authenticateToken, getMails);
router.put("/get-mails/:id/read", authenticateToken, readMail);
router.put("/get-mails/:id/delete", authenticateToken, deleteMail);
router.get("/sent-mails", authenticateToken, getSentMails);

module.exports = router;
