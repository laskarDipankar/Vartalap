"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const chatSchema = new mongoose_1.Schema({
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User"
        }],
    latestMessage: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "message"
        }],
    groupAdmin: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true,
});
const Chat = (0, mongoose_1.model)('Chat', chatSchema);
module.exports = Chat;
