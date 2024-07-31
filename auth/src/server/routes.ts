import express from "express";
import { addUser, generateToken, login, validateToken } from "./controllers";
const router = express.Router();

router.post("/register", addUser);
router.post("/login", login);
router.post("/validateaccesstoken", validateToken);
router.post("/generateaccesstoken", generateToken);

export default router;
