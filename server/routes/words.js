const express = require('express')
const router = express.Router()

const wordController = require('../controllers/word')
const authService = require('../services/auth')

router.get('',  authService.checkJWT, wordController.getWords)
router.post('', authService.checkJWT, wordController.createWord)

module.exports = router