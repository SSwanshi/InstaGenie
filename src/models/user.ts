import mongoose, { Schema, Document, Model } from "mongoose";

type PlanType = "free" | "genie" | "geniepro";

interface IServiceCount {
  captionGenerated: number;
  musicSuggested: number;
}

interface IStoryService extends IServiceCount {
  emojiSuggested: number;
}

interface IPostService extends IServiceCount {
  hashtagGenerated: number;
}

interface IReelService extends IServiceCount {
  hashtagGenerated: number;
  descriptionGenerated: number;
  topicSuggested: number;
}

interface ICommentsService {
  commentGenerated: number;
}

interface IPhotoPickerService {
  photoPicked: number;
}

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  credits: number;
  isPremium: boolean;
  plan: PlanType;
  planExpiryDays: number;
  planExpiryDate: Date;
  planLastUpdatedAt: Date;
  avatar: string;

  storyService: IStoryService;
  postService: IPostService;
  reelService: IReelService;
  commentsService: ICommentsService;
  photoPickerService: IPhotoPickerService;
  creditsUsed: number;

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
      default: "free",
    },
    planExpiryDays: { type: Number, default: 60 },
    planExpiryDate: {
      type: Date,
      default: () => {
        const now = new Date();
        now.setUTCDate(now.getUTCDate() + 60);
        return now;
      },
    },
    planLastUpdatedAt: { type: Date, default: Date.now },
    avatar: { type: String, default: "initials" },

    storyService: {
      type: {
        captionGenerated: { type: Number, default: 0 },
        musicSuggested: { type: Number, default: 0 },
        emojiSuggested: { type: Number, default: 0 },
      },
      default: { captionGenerated: 0, musicSuggested: 0, emojiSuggested: 0 },
    },

    postService: {
      type: {
        captionGenerated: { type: Number, default: 0 },
        musicSuggested: { type: Number, default: 0 },
        hashtagGenerated: { type: Number, default: 0 },
      },
      default: { captionGenerated: 0, musicSuggested: 0, hashtagGenerated: 0 },
    },

    reelService: {
      type: {
        captionGenerated: { type: Number, default: 0 },
        musicSuggested: { type: Number, default: 0 },
        hashtagGenerated: { type: Number, default: 0 },
        descriptionGenerated: { type: Number, default: 0 },
        topicSuggested: { type: Number, default: 0 },
      },
      default: { captionGenerated: 0, musicSuggested: 0, hashtagGenerated: 0, descriptionGenerated: 0, topicSuggested: 0 },
    },

    commentsService: {
      type: {
        commentGenerated: { type: Number, default: 0 },
      },
      default: { commentGenerated: 0 },
    },

    photoPickerService: {
      type: {
        photoPicked: { type: Number, default: 0 },
      },
      default: { photoPicked: 0 },
    },

    creditsUsed: {type: Number, default: 0},
  },
  { timestamps: true }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;