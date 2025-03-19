const express = require('express')

const URL = require('../models/url')
const { handleGenerateShortURL, handleRedirectURL, handleFetchAnalytics } = require('../controllers/url')

const router = express.Router()

router.post('/', handleGenerateShortURL)
router.get('/:shortid', handleRedirectURL)
router.get('/analytics/:shortid', handleFetchAnalytics)

module.exports = router