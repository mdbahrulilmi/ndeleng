import mongoose from "mongoose"
const {Schema} = mongoose;

const movieItemSchema = new Schema({
  id: { type: String, required: true },
  category: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String }
}, { _id: false });

const profileSchema = new Schema({
    name: { type: String, required: true},
    username: { type: String, required: true, unique: true},
    bio:{type: String},
    age:{type: Number},
    image: { type: String, default: "" },
    gender: { type: String, enum: ["male", "female", "other"], default: "other" },
    location: { type: String },
    favoriteGenres: [{ type: String }],
    favoriteMovies: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
    watchedlist: { type:[ movieItemSchema ], default:[] },
    withlist: { type:[ movieItemSchema ], default:[] },
    followers: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
    following: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
    points: { type: Number, default: 0 },
    badges: [{ type: String }],
    socialLinks: {
        instagram: String,
        twitter: String,
        letterboxd: String,
    },
},{
    timestamps:true,
    versionKey: false
});

export const Profile = mongoose.models.Profile || mongoose.model("Profile", profileSchema);