import type { Request, Response } from "express";
import { PostModel } from "../models/Post";
import { type IJwtMW } from "../interfaces/authorization";
import { validationResult, type ValidationError } from "express-validator";
import { httpResponses } from "./utils/httpResponses";

export const create = async (req: Request, res: Response) => {
  try {
    const { title, text, tags, imageUrl } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      httpResponses.badRequest(res, errors);
      return;
    }
    const doc = new PostModel({
      title,
      text,
      tags,
      imageUrl,
      author: (req as IJwtMW).user,
    });

    const post = await doc.save();

    httpResponses.succeed(res, post);
  } catch (error) {
    httpResponses.serverError(res);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      httpResponses.badRequest(res, errors);
      return;
    }
    const userId = (req as IJwtMW).user._id;
    const { id } = req.params;
    const { title, imageUrl, text, tags } = req.body;

    if (!id) {
      httpResponses.badRequest(res, "Invalid postId format");
      return;
    }

    const updatePost = await PostModel.findOneAndUpdate(
      { _id: id, author: userId },
      { title, imageUrl, text, tags }
    );

    if (!updatePost) {
      const existance = await PostModel.exists({ _id: id });
      existance
        ? httpResponses.forbidden(res, "You aren't the author of this post")
        : httpResponses.notFound(res, "Post not found");
      return;
    }

    httpResponses.succeed(res);
  } catch (error) {
    httpResponses.serverError(res);
  }
};

export const delPost = async (req: Request, res: Response) => {
  try {
    const userId = (req as IJwtMW).user._id;
    const { id } = req.params;

    if (!id) {
      httpResponses.badRequest(res, "Invalid postId format");
      return;
    }

    const deletedPost = await PostModel.findOneAndDelete(
      { _id: id, author: userId },
      { projection: { __v: 0 }, lean: true }
    );

    if (!deletedPost) {
      const existance = await PostModel.exists({ _id: id });
      existance
        ? httpResponses.forbidden(res, "You aren't the author of this post")
        : httpResponses.notFound(res, "Post not found");
      return;
    }

    httpResponses.succeed(res);
  } catch (error) {
    httpResponses.serverError(res);
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const allPosts = await PostModel.find().lean().populate({
      path: "author",
      select: "login avatarUrl",
    });

    if (!allPosts) {
      httpResponses.notFound(res, "Posts don't exist");
    }

    const otherData = allPosts.map(({ viewedBy, __v, ...rest }) => ({
      ...rest,
    }));

    httpResponses.succeed(res, otherData);
  } catch (error) {
    httpResponses.serverError(res);
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    const userId = (req as IJwtMW).user._id;

    if (!userId) {
      httpResponses.notAuthorized(res);
      return;
    }

    let post = await PostModel.findOneAndUpdate(
      {
        _id: postId,
        viewedBy: { $ne: userId },
      },
      {
        $inc: { viewsCount: 1 },
        $push: { viewedBy: userId },
      },
      {
        new: true,
      }
    ).populate({
      path: "author",
      select: "login avatarUrl",
    });

    if (!post) {
      post = await PostModel.findById(postId).populate({
        path: "author",
        select: "login avatarUrl",
      });
    }

    if (!post) {
      httpResponses.notFound(res, "Post doesn't exist");
      return;
    }

    const { viewedBy, __v, ...otherData } = post.toObject();

    httpResponses.succeed(res, otherData);
  } catch (error) {
    httpResponses.serverError(res);
  }
};
