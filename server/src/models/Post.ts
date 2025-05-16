import { model, Schema } from "mongoose";
import type { IPost } from "../interfaces/models";

const PostSchema = new Schema<IPost>(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    viewedBy: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
    imageUrl: String,
  },
  {
    timestamps: true,
  }
);

export const PostModel = model<IPost>("Post", PostSchema);
