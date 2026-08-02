import mongoose from 'mongoose'
const { Schema, model } = mongoose;

const BanSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    }
}, {
    timestamps: true
})

const Ban = model("Ban", BanSchema);
export default Ban