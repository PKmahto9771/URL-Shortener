const mongoose = require('mongoose')

async function connectMongoDB(URI){
    try{
        await mongoose.connect(URI)
        console.log('MongoDB connected')
    }
    catch(err){
        console.log('Erroor connecting mongoDB', err)
    }
}

module.exports = {
    connectMongoDB,
}