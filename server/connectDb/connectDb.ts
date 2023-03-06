const fastify = require('fastify')()
const MongoUrl = "mongodb+srv://Dipankar45:Dipankar45%40@firstdatabase.8yv0tam.mongodb.net/chatApp?retryWrites=true&w=majority"
const mongoose = require('mongoose')

// const connectDb = async () => {
//     try {
//         await mongoose.connect('@fastify/mongodb', {
//             forceClose: true,
//             url: MongoUrl

//                 })
//         console.log('Connected to MongoDB')
//     } catch (err) {
//         console.log(err)
//     }
// }

const connectDb = async () => {
    try {
        await mongoose.connect(MongoUrl, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        })
        console.log('Connected to MongoDB')
    } catch (err) {
        console.log(err)
    }
}




module.exports = connectDb