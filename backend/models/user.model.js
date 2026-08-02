import mongoose from "mongoose";

const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
      default: "",
    },

    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: "Car",
      },
    ],
    
    isVerified: {
      type: Boolean,
      default: false
    },
    verificationOTP: String,
    verificationOTPExpires: Date,
    resetPasswordOTP: String,
    resetPasswordOTPExpires: Date
  },
  {
    timestamps: true,
  }
);

const User = model("User", UserSchema);

export default User;