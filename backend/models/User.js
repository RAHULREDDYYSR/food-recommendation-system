import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please provide name'],
        minLength:3,
        maxLength:50
    },
    email:{
        type:String,
        unique:true,
        required:[true,'please provide email address'],
        validate:{
            validator:validator.isEmail,
            message:'please provide a valid email'
        }
    },
    password:{
        type:String,
        required:[true,'please provide password'],
        minLength:6,

    },
    role:{
        type:String,
        enum:['admin', 'user'],
        default:'user'
    },
    age:{
        type: Number,
        min: [10, 'Age must be at least 10'],  
        max: [100, 'Age must be less than or equal to 100'],
        default: 21
    },
    gender:{
        type:String,
        enum:['male', 'female']
    },
    weight:{
        type:Number,
        min: [40, 'Weight must be at least 40'],
        max: [150, 'Weight must be less than or equal to 150'],
        default: 70
    }
})

UserSchema.pre('save', async function(){
    if(!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch;
}
export const User = mongoose.model('User',UserSchema);