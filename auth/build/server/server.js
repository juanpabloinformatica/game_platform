"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
// import { CORS_OPTIONS, JWT_OPTIONS_MIDDLEWARE, PORT } from "../variables";
const variables_1 = require("../variables");
require("../database/database");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// import { jwt } from "express-jwt";
// import { expressjwt } from "express-jwt";
// import { addUser, testConnection } from "../database/database";
// import { testConnection } from "../database/database";
//check database
const app = (0, express_1.default)();
// middlewares
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)(variables_1.DOCKER ? variables_1.CORS_OPTIONS_DOCKER : variables_1.CORS_OPTIONS));
// app.use(expressjwt(JWT_OPTIONS_MIDDLEWARE));
// add routes
app.use("/", routes_1.default);
// app.listen(PORT, () => {
//     console.log("listenning");
// });
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    // await addUser();
    // await testConnection();
    app.listen(variables_1.PORT, () => {
        console.log("listenning");
    });
});
init();
