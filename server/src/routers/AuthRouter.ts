import express from "express";
import * as UserController from "../controllers/UserController";
import { jwtMW } from "../controllers/utils/jwtMW";
import * as Validation from "../../validations";

const router = express.Router();

router.post("/auth/register", Validation.register, UserController.register);
router.post("/auth/login", Validation.login, UserController.login);
router.get("/auth/me", jwtMW, UserController.getMe);

export default router;
