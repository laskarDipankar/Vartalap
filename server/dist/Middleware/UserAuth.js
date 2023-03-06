"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
const jwt_Secret = process.env.JWT_SECRET;
const UserDB = require("../Models/UserSchema");
// const jwtVerify = (token : string) => {
//     return new Promise((resolve,reject)=>{
//         jwt.verify(token,jwt_Secret,(err:any,decoded:any)=>{
//             if(err){
//                 reject(err)
//             }else{
//                 resolve(decoded)
//             }
//         })
//     }
//     )
// }
const authenticate = async (request, reply) => {
    const token = request.headers['x-access-token'];
    if (!token) {
        return reply.send({
            code: 400,
            error: "please provide token"
        });
    }
    try {
        const decoded = await jwt.verify(token, jwt_Secret);
        const user = await UserDB.findOne({ _id: decoded._id });
        if (!user) {
            return reply.send({
                code: 400,
                error: "user not exist"
            });
        }
        // request.user = user;
        reply.send({
            code: 200,
            message: "user authenticated successfully"
        });
    }
    catch (error) {
        console.log(error);
    }
};
module.exports = authenticate;
