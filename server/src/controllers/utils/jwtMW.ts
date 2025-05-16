import type { NextFunction, Request, Response } from "express";
import jwt, {
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError,
  type JwtPayload,
} from "jsonwebtoken";
import { JwtHash } from "../../../dotenv_config/dotenvConfig";
import type { IJwtMW } from "../../interfaces/authorization";
import { httpResponses } from "./httpResponses";

export const jwtMW = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || typeof authHeader !== "string") {
      httpResponses.notAuthorized(res);
      return;
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
      httpResponses.badRequest(res);
      return;
    }

    const decodedPayload = jwt.verify(token, JwtHash, {
      algorithms: ["HS256"],
    }) as JwtPayload;

    (req as IJwtMW).user = decodedPayload;

    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      httpResponses.notAuthorized(res, "JWT token expired");
      return;
    }
    if (error instanceof JsonWebTokenError) {
      httpResponses.forbidden(res, "JWT token malformed or invalid");
      return;
    }
    if (error instanceof NotBeforeError) {
      httpResponses.notAuthorized(res, "JWT token not active");
      return;
    }

    httpResponses.serverError(res, "Session token error probably on server");
  }
};
