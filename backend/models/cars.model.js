import mongoose from "mongoose";
const { Schema, model } = mongoose;

const CarSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    brand: {
      type: Schema.Types.ObjectId,
      ref: 'Brand',
      required: true
    },

    model: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    car_image: {
      type: String, // Cloudinary URL or image path
      required: true,
    },

    gallery: [
      {
        type: String, // Array of image URLs
      },
    ],

    launch_year: {
      type: Number,
      required: true,
    },

    body_type: {
      type: String,
      required: true,
    },

    engine_capacity: {
      type: Number, // in cc
      required: true,
    },

    mileage: {
      type: Number, // km/l
      required: true,
    },

    top_speed: {
      type: Number, // km/h
      required: true,
    },

    seating_capacity: {
      type: Number,
      required: true,
    },

    drive_type: {
      type: String,
      required: true,
    },

    colors: [
      {
        type: String,
      },
    ],

    safety_features: [
      {
        type: String,
      },
    ],

    rating: {
      type: Number,
      default: 0,
    },

    user_reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "UserReview",
      },
    ],

    expert_reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "AdminReview",
      },
    ],

    status: {
      type: String,
      enum: ["Available", "Upcoming", "Discontinued"],
      default: "Available",
    },
  },
  {
    timestamps: true,
  }
);

const Car = model("Car", CarSchema);

export default Car;