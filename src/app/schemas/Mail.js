import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    flag: {
      type: String,
      required: true
    },
    from: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    to: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    subject: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Mail", schema);
