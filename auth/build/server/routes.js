"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("./controllers");
const router = express_1.default.Router();
router.post("/register", controllers_1.addUser);
router.post("/login", controllers_1.login);
router.post("/validateaccesstoken", controllers_1.validateToken);
router.post("/generateaccesstoken", controllers_1.generateToken);
exports.default = router;
