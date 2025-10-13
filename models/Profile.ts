import mongoose from "mongoose"
const {Schema} = mongoose;

const profileSchema = new Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true},
    username: { type: String, required: true, unique: true},
    bio:{type: String},
    age:{type: Number},
    image: { type: String, default: "" },
    gender: { type: String, enum: ["male", "female", "other"], default: "other" },
    location: { type: String },
    favoriteGenres: [{ type: String }],
    favoriteMovies: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
    watchlist: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
    followers: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
    following: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
    points: { type: Number, default: 0 },
    badges: [{ type: String }],
    socialLinks: {
        instagram: String,
        twitter: String,
        letterboxd: String, // platform film populer
    },
},{
    timestamps:true,
    versionKey: false
});

export const Profile = mongoose.models.Profile || mongoose.model("Profile", profileSchema);