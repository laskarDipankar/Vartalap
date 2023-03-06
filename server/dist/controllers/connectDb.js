"use strict";
const fastify = require('fastify')();
const connectDb = async () => {
    try {
        await fastify.register(require('fastify-mongodb'), {
            url: 'mongodb://localhost:27017'
        });
        console.log('Connected to MongoDB');
    }
    catch (err) {
        console.log(err);
    }
};
module.exports = connectDb;
