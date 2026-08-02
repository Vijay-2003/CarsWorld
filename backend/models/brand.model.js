import mongoose from "mongoose";

const { Schema, model } = mongoose;

const BrandSchema = new Schema({
    brand_name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    brand_logo: {
        type: String,
        required: true
    },
    brand_banner: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    brand_founder: {
        type: String,
        required: true,
        trim: true,
    },
    country: {
        type: String,
        required: true,
        trim: true,
    },

    headquarters: {
        type: String,
        required: true,
        trim: true,
    },

    founded: {
        type: Number,
        required: true,
    },

    motto: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    timestamps: true
});

const Brand = model("Brand", BrandSchema);
export default Brand;