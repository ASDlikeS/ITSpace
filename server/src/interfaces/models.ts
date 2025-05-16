import type { Document, Types } from "mongoose";

export interface IPost extends Document {
  author: Types.ObjectId;
  title: string;
  text: string;
  tags: string[];
  viewsCount: number;
  viewedBy: [Types.ObjectId];
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser extends Document {
  login: string;
  email: string;
  passwordHash: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  job: string;
}
