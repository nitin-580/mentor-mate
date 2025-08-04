import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email?: string;
  phone: string;
  password: string;
  type: "mentor" | "mentee";
  verified: boolean;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, unique: true, sparse: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    type: { type: String, enum: ["mentor", "mentee"], required: true },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
