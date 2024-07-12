import express from "express";
import { addUser, login } from "./controllers";
const router = express.Router();

router.post("/register", addUser);
router.post("/login", login);

export default router;
