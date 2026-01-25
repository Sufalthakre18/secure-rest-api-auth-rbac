import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 50,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: /^\S+@\S+\.\S+$/,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
            select: false, 
        },

        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
)


userSchema.pre('save',async (next) => {
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.comparePassword=async function (password) {
    return bcrypt.compare(password,this.password)
}

export default mongoose.model('User',userSchema)