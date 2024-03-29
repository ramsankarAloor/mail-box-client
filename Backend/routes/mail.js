const router = require('express').Router()
const {authenticateToken} = require('../middlewares/authenticateToken')
const {postMail} = require('../controllers/mail')

router.post('/send-mail', authenticateToken, postMail)

module.exports = router
