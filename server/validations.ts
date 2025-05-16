import { body } from "express-validator";

export const register = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен состоять минимум из 6 символов").isLength({
    min: 6,
  }),
  body("login", "Логин должен состоять минимум из 3 символов").isLength({
    min: 3,
  }),
  body("avatarUrl", "Неверная ссылка на аватарку").optional().isURL(),
];

export const login = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен состоять минимум из 6 символов").isLength({
    min: 6,
  }),
];

export const create = [
  body("title", "Минимальное кол-во символов 3")
    .isLength({ min: 3 })
    .isString(),
  body("text", "Минимальное кол-во символов 10")
    .isLength({ min: 10 })
    .isString(),
  body("tags", "Неверный формат тегов, (укажите массив)").optional().isArray(),
  body("imageUrl", "Неверная ссылка на изображение").optional().isURL(),
];

export const update = [
  body("title", "Минимальное кол-во символов 3")
    .optional()
    .isLength({ min: 3 })
    .isString(),
  body("text", "Минимальное кол-во символов 10")
    .optional()
    .isLength({ min: 10 })
    .isString(),
  body("tags", "Неверный формат тегов, (укажите массив)").optional().isArray(),
  body("imageUrl", "Неверная ссылка на изображение").optional().isURL(),
];
