import type { Request } from "express";
import type { ValidationError } from "express-validator";
import type { JwtPayload } from "jsonwebtoken";

export interface authResponse {
  token?: string;
  errors?: ValidationError[] | string;
}

export interface authRequest {
  email: string;
  login?: string;
  password: string;
  avatarUrl?: string;
}

export interface IJwtMW extends Request {
  user: JwtPayload;
}
