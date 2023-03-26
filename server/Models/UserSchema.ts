import { Schema, Document, model, Model } from 'mongoose';


export interface IUser {
    name: string;
    age: number;
    gender: string;
    email: string;
    password: string;
    image: string;

}

export interface IUserDocument extends IUser, Document {
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
},
    {
        timestamps: true,
    }
);
 const User: Model<IUserDocument> = model<IUserDocument>('User', UserSchema);

 module.exports = User;
