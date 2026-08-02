import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const inquirySchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "contacted", "closed"],
        default: "pending"
    }
}, {
    timestamps: true
})

const inquiry = model('Inquiry', inquirySchema);
export default inquiry;