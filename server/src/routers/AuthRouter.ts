import express from "express";
import * as UserController from "../controllers/UserController";
import { jwtMW } from "../controllers/utils/jwtMW";
import * as Validation from "../../validations";

const router = express.Router();

router.post("/register", Validation.register, UserController.register);
router.post("/login", Validation.login, UserController.login);
router.get("/me", jwtMW, UserController.getMe);

export default router;
