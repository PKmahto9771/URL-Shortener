const express = require('express')
const { handleCreateNewUser, handleLogin } = require('../controllers/user')

const router = express.Router()

router.post('/signup', handleCreateNewUser)
router.post('/login', handleLogin)

module.exports = router