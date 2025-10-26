import { timeStamp } from "console";
import mongoose from "mongoose";
const {Schema} = mongoose;

const postSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: "Profile", 
        required: true 
    },
    movieId : {type:String, required:true},
    text : {type:String, required:true},
    timestamp: { type: Date, default: Date.now }
})

export const Post = mongoose.models.Post || mongoose.model("Post", postSchema);