import mongoose, { Schema, Document } from "mongoose";

export interface IMentee extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  age: number;
  profilePhoto?: string;
  gender: "male" | "female" | "other";
  working: "student" | "professional" | "employee";
  contactedMentors: mongoose.Types.ObjectId[];
  currentMentor?: mongoose.Types.ObjectId;
  searchHistory: string[];
  viewedMentors: mongoose.Types.ObjectId[];
  rejectedRequests: mongoose.Types.ObjectId[];
  totalPaybacks: { transactionId: string; requestId: mongoose.Types.ObjectId }[];
  complaints: mongoose.Types.ObjectId[];
  ratedReviews: mongoose.Types.ObjectId[];
  lastLogin?: Date;
}

const MenteeSchema = new Schema<IMentee>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: String,
    age: Number,
    profilePhoto: String,
    gender: { type: String, enum: ["male", "female", "other"] },
    working: { type: String, enum: ["student", "professional", "employee"] },
    contactedMentors: [{ type: Schema.Types.ObjectId, ref: "Request" }],
    currentMentor: { type: Schema.Types.ObjectId, ref: "Mentor" },
    searchHistory: [String],
    viewedMentors: [{ type: Schema.Types.ObjectId, ref: "Mentor" }],
    rejectedRequests: [{ type: Schema.Types.ObjectId, ref: "Request" }],
    totalPaybacks: [
      {
        transactionId: String,
        requestId: { type: Schema.Types.ObjectId, ref: "Request" },
      },
    ],
    complaints: [{ type: Schema.Types.ObjectId, ref: "Complaint" }],
    ratedReviews: [{ type: Schema.Types.ObjectId, ref: "ReviewRated" }],
    lastLogin: Date,
  },
  { timestamps: true }
);

export default mongoose.model<IMentee>("Mentee", MenteeSchema);
