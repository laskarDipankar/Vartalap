"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const fastifyEnv = require('@fastify/env');
const jwt = require('fastify-jwt');
const env = require('dotenv');
const cors_1 = __importDefault(require("@fastify/cors"));
env.config();
const jwt_Secret = process.env.JWT_SECRET;
const connectDb = require("./connectDb/connectDb");
const PORT = 5500;
const app = (0, fastify_1.default)({
    // logger : true,
    ignoreTrailingSlash: true
});
app.register(cors_1.default, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    preflightContinue: false,
    optionsSuccessStatus: 204
});
app.register(connectDb);
app.register(jwt, {
    secret: jwt_Secret
});
app.register(require("./routes/User"));
app.get('/', (request, reply) => {
    reply.send({ start: "lets start fastify server" });
});
app.get("/user", async (req, rep) => {
    const { name, age } = req.query;
    return rep.send({
        code: 200,
        message: "success",
        data: {
            name: "rahuketan",
            age: 24
        }
    });
});
const start = async (port) => {
    try {
        await app.listen(port);
        app.log.info(`server is listening to ${PORT}`);
        console.log(`server is listening to ${PORT}`);
    }
    catch (err) {
        app.log.error(err);
        // process.exit(1);
    }
};
start(PORT);
