import express, { type ErrorRequestHandler } from "express";
import { ServerPort } from "./dotenv_config/dotenvConfig.ts";
import { connectMongoDB } from "./src/mongo_db/MongoConnection.ts";
import postRouter from "./src/routers/PostRouter.ts";
import authRouter from "./src/routers/AuthRouter.ts";
import cors from "cors";

const app = express();

app.use(cors());

app.use(
  cors({
    origin: "http://192.168.31.235",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json({ strict: true }));

const errorHandler: ErrorRequestHandler = (err, _, res, next) => {
  if (
    err instanceof SyntaxError &&
    "status" in err &&
    (err as any).status === 400 &&
    "body" in err
  ) {
    res.status(400).json({ message: "Invalid JSON" });
    return;
  }

  next(err);
};

app.use(errorHandler);

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/auth", authRouter);

function startServer() {
  try {
    connectMongoDB();

    app.listen(ServerPort, (err) => {
      if (err) {
        throw new Error("Server didn't start error: " + err);
      }
      console.log("Server started on port " + ServerPort);
    });
  } catch (error) {
    console.error("Something wrong...\n" + error);
    process.exit(1);
  }
}

startServer();
