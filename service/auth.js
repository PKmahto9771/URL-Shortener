const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.JWT_SECRET

function setUser(user){
    return jwt.sign({
        _id:user._id,
        email: user.email,
    }, secret)
}

function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        console.error("JWT Verification Failed:", error.message);
        return null;
    }
}

module.exports = {
    setUser,
    getUser,
}