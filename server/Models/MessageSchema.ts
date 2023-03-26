import { Schema, Document, model, Model } from 'mongoose';




export interface MessageInterface {
    sender : string,
    reciever : string,
    content :string,
    chat : string
   
}
const MessageSchema = new Schema ({

    sender : {
        type : Schema.Types.ObjectId,
        ref :"User"
    },
    content :{
        type :String,
        trim : true,
    
    },
    chat : { type : Schema.Types.ObjectId,
        ref :"Chat"}
},{
    timestamps : true
})


const Message : Model<MessageInterface> = model<MessageInterface>("message",MessageSchema)

module.exports = Message

