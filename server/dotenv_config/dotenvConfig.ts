import dotenv from "dotenv";

dotenv.config();

if (!process.env.SERVER_PORT) {
  throw new Error("Environment variable SERVER_PORT is not defined");
} else if (!process.env.JWT_HASH) {
  throw new Error("Environment variable JWT_HASH is not defined");
} else if (!process.env.MONGO_URI) {
  throw new Error("Environment variable MONGO_URI is not defined");
}

export const ServerPort = process.env.SERVER_PORT;
export const JwtHash = process.env.JWT_HASH;
export const MongoURI = process.env.MONGO_URI;
