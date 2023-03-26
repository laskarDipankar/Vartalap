"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const fastifyInstance = (0, fastify_1.default)({
    logger: true,
    ignoreTrailingSlash: true,
});
// import fastifyInstance from "fastify";
async function default_1(app) {
    app.get("/userd", async (request, reply) => {
        return { hello: "world" };
    });
}
exports.default = default_1;
