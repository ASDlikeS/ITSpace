import { type Request, type RequestHandler, type Response } from "express";
import { validationResult } from "express-validator";
import { UserModel } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JwtHash } from "../../dotenv_config/dotenvConfig";
import type {
  authRequest,
  authResponse,
  IJwtMW,
} from "../interfaces/authorization";
import { httpResponses } from "./utils/httpResponses";

export const register: RequestHandler<{}, authResponse, authRequest> = async (
  req,
  res
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      httpResponses.badRequest(res, errors);
      return;
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      login: req.body.login,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });

    let user;
    try {
      user = await doc.save();
    } catch (err: any) {
      if (err.code === 11000) {
        httpResponses.forbidden(
          res,
          "Пользователь с таким email уже существует"
        );
        return;
      }

      httpResponses.serverError(res);
      return;
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      JwtHash,
      {
        expiresIn: "30d",
      }
    );

    res.json({
      token,
    });
  } catch (error) {
    httpResponses.serverError(res);
  }
};

export const login: RequestHandler<{}, authResponse, authRequest> = async (
  req,
  res
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      httpResponses.forbidden(res, "Incorrect email or password...");
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordCorrect) {
      httpResponses.forbidden(res, "Incorrect email or password...");
      return;
    }
    const token = jwt.sign({ _id: user._id }, JwtHash, { expiresIn: "30d" });

    res.json({ token });
  } catch (error) {
    httpResponses.serverError(res);
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const userId = (req as IJwtMW).user._id;
    if (!userId) {
      httpResponses.notAuthorized(res);
      return;
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      httpResponses.notFound(res);
      return;
    }

    const { passwordHash, ...otherData } = user.toObject();

    httpResponses.succeed(res, otherData);
  } catch (error) {
    httpResponses.serverError(res);
  }
};
