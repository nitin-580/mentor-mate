import mongoose, { Schema, Document } from "mongoose";

export interface IMentor extends Document {
  userId: mongoose.Types.ObjectId;
  profilePhoto: string;
  name: string;
  contactedClients: mongoose.Types.ObjectId[];
  exams: { name: string; image: string; rank: string }[];
  categories: string[];
  college: { name: string; state: string; city: string };
  currentJob: { post: string; companyName: string; state: string; city: string };
  experience: { post: string; companyName: string; state: string; city: string }[];
  bio: string;
  pricing: { amount: number; currency: string };
  rating: number;
  pastRating: number[];
  reviews: mongoose.Types.ObjectId[];
  videoLink: string;
  photos: string[]; // limit to 3 at logic layer
  lastLogin?: Date;
}

const MentorSchema = new Schema<IMentor>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    profilePhoto: String,
    name: String,
    contactedClients: [{ type: Schema.Types.ObjectId, ref: "Request" }],
    exams: [
      {
        name: String,
        image: String,
        rank: String,
      },
    ],
    categories: [String],
    college: {
      name: String,
      state: String,
      city: String,
    },
    currentJob: {
      post: String,
      companyName: String,
      state: String,
      city: String,
    },
    experience: [
      {
        post: String,
        companyName: String,
        state: String,
        city: String,
      },
    ],
    bio: String,
    pricing: {
      amount: Number,
      currency: { type: String, default: "INR" },
    },
    rating: { type: Number, default: 0 },
    pastRating: [Number],
    reviews: [{ type: Schema.Types.ObjectId, ref: "ReviewRated" }],
    videoLink: String,
    photos: [String],
    lastLogin: Date,
  },
  { timestamps: true }
);

export default mongoose.model<IMentor>("Mentor", MentorSchema);
