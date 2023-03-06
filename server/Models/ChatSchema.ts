
import { Schema, Document, model, Model } from 'mongoose';


export interface ChatInterface {
    chatName : string,
    isGroupChat: boolean,
    users : string,
    latestMessage : string,
    admin : string
}



const chatSchema = new Schema({

    chatName : {type : String , trim : true},
    isGroupChat : {type:Boolean},
    users :[{
        type : Schema.Types.ObjectId,
        ref:"User"
    }],
    latestMessage : [{
        type : Schema.Types.ObjectId,
        // ref:Message
    }],
    groupAdmin :{
        type : Schema.Types.ObjectId,
        ref:"User"
    }
},
{
    timestamps: true,
}
)


const Chat : Model<ChatInterface> = model<ChatInterface>('chat',chatSchema)
module.exports = Chat
    




