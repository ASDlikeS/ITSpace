import type { Response } from "express";
import type { Result, ValidationError } from "express-validator";

export const httpResponses = {
  badRequest: (
    res: Response,
    message: string | Result<ValidationError> = "Bad request"
  ) => {
    res.status(400).json({ message });
  },
  notAuthorized: (res: Response, message = "Unauthorized") => {
    res.status(401).json({ message });
  },
  forbidden: (res: Response, message = "Forbidden") => {
    res.status(403).json({ message });
  },
  notFound: (res: Response, message = "Not Found") => {
    res.status(404).json({ message });
  },
  serverError: (res: Response, message = "Server Error") => {
    res.status(500).json({ message });
  },
  succeed: (res: Response, object: Array<any> | Object = { succeed: true }) => {
    res.status(200).json(object);
  },
};
