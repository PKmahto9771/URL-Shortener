const USER = require('../models/user')
const {URL} = require('../models/url')
const { setUser } = require('../service/auth');

async function handleCreateNewUser(req, res){
    const {name, email, password} = await req.body
    await USER.create({
        name,
        email,
        password,
    })

    const urls = await URL.find({})

    return res.redirect('/')
}

async function handleLogin(req, res){
    try{
        const {email, password} = req.body

        const user = await USER.findOne({email, password})
    
        if(!user) return res.redirect('/login')
        
        const token = setUser(user)
        res.cookie("uid", token)
        return res.redirect('/')
    }catch(err){
        return res.status(500).json({status:'error', message:'Internal Server Error'})
    }
}

module.exports = {
    handleCreateNewUser,
    handleLogin,
}