"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
const jwt_Secret = "abc123";
const UserDB = require("../Models/UserSchema");
const authenticate = async (request, reply) => {
    const authHeader = request.headers['authorization'];
    const bearer = authHeader?.split(' ')[1];
    if (!bearer) {
        console.log("why so !");
        return reply.send({
            code: 401,
            error: "please login"
        });
    }
    else {
        try {
            const payload = jwt.verify(bearer, jwt_Secret);
            const user = await UserDB.findOne({ _id: payload._id });
            // console.log(user)
            if (!user) {
                return reply.send({
                    code: 401,
                    error: "please login"
                });
            }
            request.user = user;
            // request.user.token = token;
            return request;
        }
        catch (error) {
            console.log(error);
            return reply.send({
                code: 401,
                error: "please login"
            });
        }
    }
};
module.exports = authenticate;
