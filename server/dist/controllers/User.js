"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userData = require('../Data/User.json');
const fastify_1 = __importDefault(require("fastify"));
const server = (0, fastify_1.default)({});
const opts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    // name: { type: 'string' },
                    email: { type: 'string' },
                    password: { type: 'string' }
                }
            }
        }
    },
};
server.get('/user', opts, async (request, reply) => {
    reply.send(userData);
});
exports.default = server;
