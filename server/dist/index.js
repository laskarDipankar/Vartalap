"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const env = require('dotenv');
const connectDb = require("./connectDb/connectDb");
const cors_1 = __importDefault(require("@fastify/cors"));
const fastify_socket_io_1 = __importDefault(require("fastify-socket.io"));
const app = (0, fastify_1.default)({
    ignoreTrailingSlash: true
});
const PORT = 5550;
env.config();
app.register(cors_1.default, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    preflightContinue: false,
});
app.ready().then(() => {
    app.io.on("connection", (socket) => {
        socket.on("setup", (chatData) => {
            socket.join(chatData);
            console.log(chatData, "chatdata");
            socket.emit("conncted to socket");
        });
        socket.on("join room", (room) => {
            socket.join(room);
            console.log(room, "room");
        });
        socket.on("typing", (room) => {
            console.log("typing");
            socket.in(room).emit("typing", room);
        });
        socket.on("stop typing", (room) => {
            console.log("stop typing");
            socket.in(room).emit("stop typing", room);
        });
        socket.on("new message", (data) => {
            let chat = data;
            if (!chat.chat.users) {
                return console.log("chat.users not sent with message");
            }
            else {
                chat.chat.users.forEach((user) => {
                    if (user._id === data.sender._id) {
                        return;
                    }
                    socket.broadcast.to(user).emit("message received", chat);
                });
            }
        });
    });
});
app.register(fastify_socket_io_1.default, {
    pingTimeout: 60000,
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        preflightContinue: false,
        optionsSuccessStatus: 204
    }
});
app.register(connectDb);
app.register(require("./routes/User"));
app.register(require("./routes/Chat"));
app.register(require("./routes/Message"));
app.get('/', (request, reply) => {
    reply.send({ start: "lets start fastify server" });
});
async function start() {
    app.listen(PORT, (err, address) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`Server listening at ${address}`);
    });
}
start();
