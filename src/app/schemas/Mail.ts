import mongoose, { Document, Schema } from 'mongoose';

export interface Mail extends Document {
  flag: string;
  from: string;
  to: string;
  subject: string;
}

const schema: Schema = new Schema(
  {
    flag: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    to: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Mail>('Mail', schema);
