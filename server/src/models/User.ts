import { model, Schema } from "mongoose";
import type { IUser } from "../interfaces/models";

const UserSchema = new Schema<IUser>(
  {
    login: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    job: String,

    avatarUrl: String,
  },
  {
    timestamps: true,
  }
);

export const UserModel = model<IUser>("User", UserSchema);
