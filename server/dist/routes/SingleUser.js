"use strict";
const UserData1 = require("../Data/User");
module.exports = async function (fastify, opts, next) {
    fastify.get('/getUser', route1Handler);
};
const route1Handler = async (request, reply) => {
    return reply.send({
        code: 200,
        message: "success",
        data: UserData1
    });
};
