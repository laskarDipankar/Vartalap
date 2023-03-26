import fastify, { FastifyInstance } from "fastify";
const env = require('dotenv')
const connectDb = require("./connectDb/connectDb");
import cors from '@fastify/cors'
import fastifyIO from "fastify-socket.io";
import { isArrayBufferView } from "util/types";
import { Socket } from "socket.io";
const app : FastifyInstance = fastify({
    ignoreTrailingSlash : true
})
const PORT  = 5550;
env.config();


app.register(
    cors,{
        origin : "*",
        methods : ["GET","POST","PUT","DELETE"],
        allowedHeaders : ["Content-Type","Authorization"],
        preflightContinue : false,
    }
)


app.ready().then(() => {
   app.io.on("connection",(socket)=>{

    socket.on("setup",(chatData)=>{

        socket.join(chatData)
        console.log(chatData,"chatdata")
        socket.emit("conncted to socket")
    })

    socket.on("join room",(room)=>{
        socket.join(room)
        console.log(room,"room")
    }
    )

    socket.on("typing",(room)=>{
        console.log("typing")
        socket.in(room).emit("typing",room)
    }) 

    socket.on("stop typing",(room)=>{
        console.log("stop typing")
        socket.in(room).emit("stop typing",room)
        
    })

    socket.on("new message",(data)=>{
let chat = data

        if(!chat.chat.users){
            return console.log("chat.users not sent with message")
        }else{
            chat.chat.users.forEach((user:any)=>{
                if(user._id === data.sender._id){
                    return
                }
                socket.broadcast.to(user).emit("message received",chat)
            })
        }
       
    }
    )
    
   })
})


app.register(fastifyIO,{
    pingTimeout: 60000,
    cors : {
        origin : "*",
        methods : ["GET","POST","PUT","DELETE"],
        allowedHeaders : ["Content-Type","Authorization"],
        preflightContinue : false,
        optionsSuccessStatus : 204
    }
});

app.register(connectDb);
app.register(require("./routes/User"))
app.register(require("./routes/Chat"))
app.register(require("./routes/Message"))
app.get('/',(request,reply)=>{
    reply.send({start : "lets start fastify server"})
})

async function start(){
   app.listen(PORT, (err, address) => {

        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`Server listening at ${address}`);
    }
    )

}

start()





