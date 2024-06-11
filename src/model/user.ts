import { create } from "domain";
import mongoose, {Schema, Document} from "mongoose";

export interface Message extends Document{
    content: string;
    createdAt: Date;
}

const MessageSchema: Schema<Message>= new Schema({  
content: {type: String, required: true},
createdAt: {type: Date, required: true, default: Date.now}
});

export interface User extends Document{
    username: string;
    email: string;
    password: string;
    verifycode: string;
    verifycodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessages: boolean;
    messages: Message[];
}

const UserSchema: Schema<User>= new Schema({  
    username: {type: String, required: [true, "Usrname is required"], unique: true, trim:true},
    email: {type: String, required: [true, "Email is required"], unique: true, match: [/.+\@.+\..+/, "Please fill a valid email address"]},
    password: {type: String, required: [true, "Password is required"],},
    verifycode: {type: String, required: [true, "Verify code is required"]},
    verifycodeExpiry: {type: Date, required: [true, "Verify code expiry is required"]},
    isVerified: {type: Boolean, default: false, required: [true, "Is verified is required"]},
    isAcceptingMessages: {type: Boolean, default: true},
    messages: [MessageSchema]
    });

    const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);

    export default UserModel;