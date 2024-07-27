import express from "express";
import { addUser, generateToken, login, validateToken } from "./controllers";
const router = express.Router();

router.post("/register", addUser);
router.post("/login", login);
router.post("/validateaccesstoken", validateToken);
router.get("/generateAccessToken", generateToken);
// router.

export default router;
