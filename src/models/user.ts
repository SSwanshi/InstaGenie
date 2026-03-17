import mongoose, { Schema, Document, Model } from "mongoose";

type PlanType = "free" | "genie" | "geniepro";

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  credits: number;
  isPremium: boolean;
  plan: PlanType;
  planExpiryDays: number;
  createdAt: Date; 
  updatedAt: Date; 
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false }, 
    name: { type: String, required: true },
    credits: { type: Number, default: 100 },
    isPremium: { type: Boolean, default: false },
    plan: { 
      type: String, 
      enum: ["free", "genie", "geniepro"],
      default: "free" 
    },
    planExpiryDays: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;