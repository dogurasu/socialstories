import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// first argument is the singular name 
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    userImage: {
        type: String
    },
    summary: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
}, {
    // 'timestamps' automatically adds 'createdAt' and 'updatedAt' fields in our schema
    timestamps: true
});

// method to check if input password matches w/ registered password utilizing bcryptjs
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

// before a user is "saved" into our DB, let's encrypt the password
userSchema.pre('save', async function(next) {
    // check to see if anything is being done to the password field
    // if not, we can just pass thru this middleware
    if (!this.isModified('password')) {
        next();
    }
    
    // else, hash the password asynchronously
    // pw goes from plaintext to hashed
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// initialize a model
const User = mongoose.model("User", userSchema);
export default User;