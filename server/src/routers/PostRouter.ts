import express from "express";
import * as PostContoller from "../controllers/PostsController";
import { jwtMW } from "../controllers/utils/jwtMW";
import * as Validation from "../../validations";

const router = express.Router();

router.post("/", jwtMW, Validation.create, PostContoller.create);
router.get("/", PostContoller.getAll);
router.delete("/:id", jwtMW, PostContoller.delPost);
router.patch("/:id", jwtMW, Validation.update, PostContoller.update);
router.get("/:id", jwtMW, PostContoller.getOne);

export default router;
