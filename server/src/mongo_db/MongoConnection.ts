import mongoose from "mongoose";
import { MongoURI } from "../../dotenv_config/dotenvConfig";

export const connectMongoDB = async (): Promise<void> => {
  await mongoose.connect(MongoURI);
  console.log("Mongo DB Connected succesfuly!");
};
