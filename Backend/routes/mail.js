const router = require('express').Router()
const {authenticateToken} = require('../middlewares/authenticateToken')
const {postMail, getMails} = require('../controllers/mail')

router.post('/send-mail', authenticateToken, postMail)
router.get('/get-mails', authenticateToken, getMails)

module.exports = router
