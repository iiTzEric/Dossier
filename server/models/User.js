import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: function () { return !this.googleId; }   // required only if there's no googleId
   },
   googleId: {
        type: String,
        unique: true,
        sparse: true, // lets many users have no googleId without index conflicts
    },
}, { timestamps: true });

userSchema.pre("save", async function() {
    if (!this.password || !this.isModified("password")) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;