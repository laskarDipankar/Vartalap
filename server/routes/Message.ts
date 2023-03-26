import { FastifyInstance, RouteShorthandOptions, FastifyRequest, FastifyReply } from 'fastify';
const ChatDB = require("../Models/ChatSchema");
const authenticate = require("../Middleware/UserAuth");
const userDB = require("../Models/UserSchema");
const msgDb = require("../Models/MessageSchema");

interface AuthenticateRequest extends FastifyRequest {
    user: any;
}



const sendMessage = async (request: AuthenticateRequest, reply: FastifyReply) => {
    const {chatId, content} : any = request.body;
    // console.log(request.user._id,"user id")
    if(!chatId || !content){
        return reply.send({
            code:400,
            error : "send all the required data"})
    }

    let newMessaqge = {
        sender : request.user._id,
        content : content,
        chat : chatId
    }
    try {
        let message = await msgDb.create(newMessaqge)

        // console.log(message,"message")

        let saveChat = msgDb.findById(message._id)
        .populate("sender","name image ")
        .populate("chat","users")


        // message = await msgDb.populate("sender","name image")
        // console.log( message._id,"message")
        // message = await msgDb.populate("chat","users")   
       
        saveChat = await userDB.populate(saveChat,{
            path : "chat.users",
            select : "name image email"
        })
        
       await ChatDB.findByIdAndUpdate(chatId,{
            //   latestMessage : saveChat
           $set :{
            latestMessage : saveChat._id
           }
   
        }).populate("latestMessage","content")

        // console.log(saveChat,"update chat")

        reply.send({
            code:200,
            message : saveChat
        })
    }
    catch (error) {
        reply.send({
            code:400,
            error : "something went wrong"+" "+error
        })
    }
}

// const removeMessage = async (request: AuthenticateRequest, reply: FastifyReply) => {
//     const {chatId, messageId} : any = request.body;
//     // console.log(request.user._id,"user id")
//     if(!chatId || !messageId){
//         return reply.send({
//             code:400,
//             error : "send all the required data"})
//     }

//     try {
//         let message = await msgDb.findByIdAndDelete(messageId)

//         await ChatDB.findByIdAndDelete(chatId,{
//             $unset :{
//                 latestMessage : message._id
//             }
//         })

//     }
//     catch (error) {
//         reply.send({
//             code:400,
//             error : "something went wrong"+" "+error
//         })
//     }
// }

const getChat = async (request: AuthenticateRequest, reply: FastifyReply) => {
    const {chatId} : any = request.params;
    // console.log(request.user._id,"user id")
    if(!chatId){
        return reply.send({
            code:400,
            error : "send all the required data"})
    }
    try {
        const messages = await msgDb.find({chat : chatId})
        .sort({createdAt : -1})
        .populate("sender","name image")
        .populate("chat","users")

        reply.send({
            code:200,
            messages : messages
        })
    } catch (error) {
        reply.send({
            code:400,
            error : "something went wrong"+" "+error
        })
        
    }

}




module.exports = function(fastify:any, opts:any, next:any) {

    fastify.post("/send", {preValidation: [authenticate]}, sendMessage)
    // fastify.post("/remove", {preValidation: [authenticate]}, removeMessage)
    fastify.get("/get/:chatId", {preValidation: [authenticate]}, getChat)
    next()

  }