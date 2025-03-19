const shortid = require('shortid')

const { URL } = require("../models/url");


async function handleGenerateShortURL(req, res){
    if(!req.body.url) {
        return res.status(400).json({error: 'url is required'})
    }

    const urlExists = await URL.findOne({redirectURL: req.body.url, createdBy: req.user._id})

    if(urlExists) {
        return res.status(400).json({error: 'shortId for the url already exists'})
    }

    const shortId = shortid.generate()
    await URL.create({
        shortId,
        redirectURL: req.body.url,
        visitHistory: [],
        createdBy: req.user._id,
    })
    return res.render("home", {id: shortId})
}

async function handleRedirectURL(req, res){
    const shortId = req.params.shortid
    const entry = await URL.findOneAndUpdate({shortId}, {
        $push: {
            visitHistory: {
                timestamp: Date.now()
            }
        }
    })

    res.redirect(entry.redirectURL)
}

async function handleFetchAnalytics(req, res){
    const shortId = req.params.shortid
    const entry = await URL.findOne({shortId})
    res.json({clicksCount: entry.visitHistory.length, analytics: entry.visitHistory})
}

module.exports = {
    handleGenerateShortURL,
    handleRedirectURL,
    handleFetchAnalytics,
}