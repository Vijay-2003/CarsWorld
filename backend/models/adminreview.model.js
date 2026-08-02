import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ReviewSchema = new Schema(
  {
    car: {
      type: Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },

    reviewer_name: {
      type: String,
      required: true,
      trim: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    review: {
      type: String,
      required: true,
      trim: true,
    },

    source: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Review = model("AdminReview", ReviewSchema);

export default Review;