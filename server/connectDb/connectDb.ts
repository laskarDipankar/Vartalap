const fastify = require('fastify')()
const MongoUrl = "mongodb://localhost:27017/chat-app"
// const MongoUrl = "mongodb+srv://dipankar:lolpassword@chat-app.tpk673d.mongodb.net/chat-app?retryWrites=true&w=majority"
const mongoose = require('mongoose')


const connectDb = async () => {
    try {
        await mongoose.connect(MongoUrl, {
            dbName: 'chat-app',
            
           
        })
        console.log('Connected to MongoDB')
    } catch (err) {
        console.log(err,"error is found")
    }

    
}




module.exports = connectDb