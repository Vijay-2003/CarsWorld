import mongoose from "mongoose";

const { Schema, model } = mongoose;

const UserReviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    car: {
      type: Schema.Types.ObjectId,
      ref: "Car",
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
    },

    review: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserReview = model("UserReview", UserReviewSchema);

export default UserReview;