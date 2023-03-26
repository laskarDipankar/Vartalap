"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserDB = require("../Models/UserSchema");
const authenticate = require("../Middleware/UserAuth");
// import { JWT } from '@fastify/jwt';
const env = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwt_Secret = "abc123";
env.config();
const generateAuthToken = (user) => {
    console.log(user, "user");
    const token = jwt.sign({ _id: user._id }, jwt_Secret);
    return token;
};
const register = async (request, reply) => {
    const { name, age, email, 
    // gender,
    password, image, } = request.body;
    // image ? console.log("image") : console.log("no image")
    if (!name || !age || !email || !password) {
        return reply.send({
            code: 400,
            error: "please fill all the fields"
        });
    }
    try {
        const userExist = await UserDB.findOne({ email });
        if (userExist) {
            reply.send({
                code: 400,
                error: "user already exist"
            });
        }
        else {
            const user = new UserDB({
                name,
                age,
                email,
                password,
                image
            });
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            user.password = hashPassword;
            await user.save();
            reply.send({
                code: 200,
                message: "user registered successfully"
            });
        }
    }
    catch (error) {
        console.log(error);
    }
};
const login = async (request, reply) => {
    const { email, password } = request.body;
    if (!email || !password) {
        return reply.send({
            code: 400,
            error: "please fill all the fields"
        });
    }
    try {
        const UserExist = await UserDB.findOne({ email });
        if (!UserExist) {
            return reply.send({
                code: 400,
                error: "user not exist"
            });
        }
        const isMatch = await bcrypt.compare(password, UserExist.password);
        if (!isMatch) {
            return reply.send({
                code: 400,
                error: "invalid credentials"
            });
        }
        const token = await generateAuthToken(UserExist);
        reply.send({
            code: 200,
            message: "user login successfully",
            UserExist,
            token
        });
    }
    catch (error) {
        console.log(error);
    }
};
const getUser = async (request, reply) => {
    const { id } = request.params;
    if (!id) {
        return reply.send({
            code: 400,
            error: "please fill all the fields"
        });
    }
    try {
        const userExist = await UserDB.findOne({ _id: id });
        if (!userExist) {
            return reply.send({
                code: 400,
                error: "user not exist"
            });
        }
        reply.send({
            code: 200,
            userExist
        });
    }
    catch (error) {
        console.log(error);
    }
};
const getAllUser = async (request, reply) => {
    try {
        const userExist = await UserDB.find();
        if (!userExist) {
            return reply.send({
                code: 400,
                error: "user not exist"
            });
        }
        reply.send({
            code: 200,
            userExist
        });
    }
    catch (error) {
        console.log(error);
    }
};
module.exports = function (fastify, opts, next) {
    fastify.post('/signup', register);
    fastify.post('/login', login);
    // fastify.get('/user/:id',getUser)
    fastify.get('/alluser', getAllUser);
    // fastify.post('/login',{preValidation:authenticate}, login)
    next();
};
