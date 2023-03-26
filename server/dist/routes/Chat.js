"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userDb = require("../Models/UserSchema");
const ChatDB = require("../Models/ChatSchema");
const authenticate = require("../Middleware/UserAuth");
const createChat = async (request, reply) => {
    const { userId } = request.body;
    const userData = request.user._id;
    // console.log(userData)
    if (!userId) {
        return reply.send({
            code: 400,
            error: "send all the required data"
        });
    }
    let isChatExist = await ChatDB.find({
        isGroupChat: false,
        $and: [
            {
                users: {
                    $elemMatch: {
                        $eq: userData
                    }
                }
            }, {
                users: {
                    $elemMatch: {
                        $eq: userId
                    }
                }
            }
        ],
    })
        .populate("users", "-password")
        .populate("latestMessage");
    isChatExist = await userDb.populate(isChatExist, {
        path: "latestMessage.sender",
        select: "name image email"
    });
    // console.log(isChatExist.length,"length")
    if (isChatExist.length > 0) {
        console.log("chat exist");
        reply.send({
            code: 400,
            isChatExist: isChatExist[0],
            error: "chat already exist"
        });
    }
    else {
        let chat = await new ChatDB({
            isGroupChat: false,
            chatName: "sender",
            users: [userData, userId]
        }).populate("users", "-password");
        try {
            const savedChat = await chat.save();
            reply.send({
                code: 200,
                message: "chat created successfully",
                data: savedChat
            });
        }
        catch (error) {
            reply.send({
                code: 400,
                // from : "catch",
                error: "something went wrong"
            });
        }
    }
};
const fetchApi = async (request, reply) => {
    // console.log("fetchApi",request.user._id)
    try {
        const userChats = await ChatDB.find({
            users: {
                $elemMatch: {
                    $eq: request.user._id
                }
            }
        })
            .sort({ createdAt: -1 })
            .populate("users", "-password ")
            .populate("groupAdmin", "-password")
            .populate("latestMessage", "content");
        const userChats1 = await userDb.populate(userChats, {
            path: "lastestMessage.sender",
            select: "name  email"
        });
        reply.send({
            code: 200,
            message: "chat fetched successfully",
            data: userChats1
        });
    }
    catch (error) {
        reply.send({
            code: 400,
            error: "something went wrong"
        });
    }
};
const fetchChat = async (request, reply) => {
    const { chatId } = request.params;
    // console.log(chatId,"chatId")
    if (!chatId) {
        return reply.send({
            code: 400,
            error: "send all the required data"
        });
    }
    try {
        const chat = await ChatDB.findById({
            _id: chatId,
            users: {
                $elemMatch: {
                    $eq: request.user._id
                }
            }
        })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .populate("latestMessage.sender", "name email image");
        reply.send({
            code: 200,
            message: "chat fetched successfully",
            data: chat
        });
    }
    catch (error) {
        reply.send({
            code: 400,
            error: "something went wrong"
        });
    }
};
const creatGroupChat = async (request, reply) => {
    const { chatName, alluser } = request.body;
    // console.log(JSON.parse(alluser),"alluser")
    if (!chatName || !alluser) {
        return reply.send({
            code: 400,
            error: "send all the required data"
        });
    }
    let users = JSON.parse(alluser);
    console.log(users, "users");
    if (users.length < 2) {
        return reply.send({
            code: 400,
            error: "select atleast 2 users"
        });
    }
    else {
        users.push(request.user._id);
        const groupChat = await ChatDB.create({
            isGroupChat: true,
            chatName: chatName,
            users: users,
            groupAdmin: request.user._id
        });
        const savedChat = await ChatDB.findById(groupChat._id)
            .populate("users", "-password -image")
            .populate("groupAdmin", "-password -image");
        reply.send({
            code: 200,
            message: "chat created successfully",
            data: savedChat
        });
    }
};
const renameGroupChat = async (request, reply) => {
    const { chatId, chatName } = request.body;
    if (!chatId || !chatName) {
        return reply.send({
            code: 400,
            error: "send all the required data"
        });
    }
    try {
        const updateChat = await ChatDB.findOneAndUpdate({
            _id: chatId
        }, {
            chatName: chatName
        }, {
            new: true
        })
            .populate("users", "-password -image")
            .populate("groupAdmin", "-password -image");
        if (!updateChat) {
            return reply.send({
                code: 400,
                error: "chat not found"
            });
        }
        console.log(updateChat._id, "updateChat");
        reply.send({
            code: 200,
            message: "chat renamed successfully",
            data: updateChat
        });
    }
    catch (error) {
        reply.send({
            code: 400,
            error: "something went wrong"
        });
    }
};
const addMembers = async (request, reply) => {
    const admin = request.user._id;
    const { chatId, alluser } = request.body;
    if (!chatId || !alluser) {
        return reply.send({
            code: 400,
            error: "send all the required datta"
        });
    }
    const Gchat = await ChatDB.find({
        _id: chatId
    });
    // console.log(Gchat.groupAdmin,"Gchat")
    const adminId = await Gchat[0].groupAdmin;
    // console.log(typeof adminId,"adminId")
    // admin.toString() !== adminId.toString()? console.log("not admin") : console.log("admin")
    // console.log()
    if (admin.toString() !== adminId.toString()) {
        return reply.send({
            code: 400,
            admin: typeof admin,
            groupAdmin: typeof adminId,
            error: "you are not admin"
        });
    }
    // console.log(JSON.parse(alluser),"alluser")
    try {
        // const user = JSON.parse(alluser)
        const updateChat = await ChatDB.findOneAndUpdate({
            _id: chatId
        }, {
            $push: {
                users: alluser
            }
        }, {
            new: true
        }).populate("users", "-password -image")
            .populate("groupAdmin", "-password -image");
        if (!updateChat) {
            return reply.send({
                code: 400,
                error: "chat not found"
            });
        }
        else {
            reply.send({
                code: 200,
                message: "members added successfully",
                data: updateChat
            });
        }
    }
    catch (error) {
        reply.send({
            code: 400,
            error: "something went wrong"
        });
    }
};
const removeMemebers = async (request, reply) => {
    const admin = request.user._id;
    const { chatId, alluser } = request.body;
    // const user = JSON.parse(alluser)
    const Gchat = await ChatDB.find({
        _id: chatId
    });
    if (!chatId || !alluser) {
        return reply.send({
            code: 400,
            error: "send all the required data"
        });
    }
    const adminId = await Gchat[0].groupAdmin;
    if (admin.toString() !== adminId.toString()) {
        return reply.send({
            code: 400,
            error: "you are not admin"
        });
    }
    try {
        const updateChat = await ChatDB.findOneAndUpdate({
            _id: chatId
        }, {
            $pull: {
                users: alluser
            }
        }, {
            new: true
        }).populate("users", "-password -image")
            .populate("groupAdmin", "-password -image");
        if (!updateChat) {
            return reply.send({
                code: 400,
                error: "chat not found"
            });
        }
        else {
            reply.send({
                code: 200,
                message: "members removed successfully",
                data: updateChat
            });
        }
    }
    catch (error) {
        reply.send({
            code: 400,
            error: "something went wrong"
        });
    }
};
module.exports = function (fastify, opts, next) {
    // fastify.post('/chat',{preValidation:authenticate},createChat)
    fastify.post('/chat', {
        preValidation: authenticate,
    }, createChat);
    fastify.get('/fetchChat', {
        preValidation: authenticate,
    }, fetchApi);
    fastify.post('/groupChat', {
        preValidation: authenticate,
    }, creatGroupChat);
    fastify.put('/groupChat', {
        preValidation: authenticate,
    }, renameGroupChat);
    fastify.put('/add', {
        preValidation: authenticate,
    }, addMembers);
    fastify.put('/remove', {
        preValidation: authenticate,
    }, removeMemebers);
    fastify.get('/fetchChat/:chatId', {
        preValidation: authenticate,
    }, fetchChat);
    next();
};
