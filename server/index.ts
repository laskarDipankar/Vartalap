import fastify, { FastifyInstance } from "fastify";
const fastifyEnv = require('@fastify/env')
const jwt = require('fastify-jwt');
const env = require('dotenv')
import cors from '@fastify/cors'

env.config();

const jwt_Secret = process.env.JWT_SECRET;

const connectDb = require("./connectDb/connectDb");

const PORT  = 5500;

const app : FastifyInstance = fastify({
    // logger : true,
    ignoreTrailingSlash : true

}
)
app.register(cors,{
    origin : "*",
    methods : ["GET","POST","PUT","DELETE"],
    allowedHeaders : ["Content-Type","Authorization"],
    preflightContinue : false,
    optionsSuccessStatus : 204
    
})

app.register(connectDb);

app.register(jwt, {
    secret: jwt_Secret
  });
app.register(require("./routes/User"))
app.get('/',(request,reply)=>{
    reply.send({start : "lets start fastify server"})
})

interface IQueryInterface{
    name :string,
    age : Number
}
interface IHeaders{
    'x-access-token':string;
}
interface IReply{
    code : Number,
    message : string,
    data : any
}

app.get<{Querystring : IQueryInterface, Headers : IHeaders, Reply:IReply}>("/user", async(req,rep)=>{
    const {name,age} = req.query;

    return rep.send({
        code : 200,
        message : "success",
        data : {
            name:"rahuketan",
            age : 24
        }
    })
})

const start = async (port:number)=>{
    try{
        await app.listen(port);
        app.log.info(`server is listening to ${PORT}`);
        console.log(`server is listening to ${PORT}`);
    }catch(err){
        app.log.error(err);
        // process.exit(1);
    }
}

start(PORT);


