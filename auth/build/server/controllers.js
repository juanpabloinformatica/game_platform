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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = addUser;
exports.login = login;
const models_1 = require("../database/models");
const helpers_1 = require("./helpers");
function addUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log(req.body)
        const { username, password, confirmPassword } = req.body;
        try {
            const user = yield models_1.User.findOne({ where: { username: username } });
            console.log(user);
            if (user) {
                res.send({ message: "User already in the database" });
                return;
            }
            if (password != confirmPassword) {
                res.send({ message: "passwords are different" });
                return;
            }
            let newPassword = yield (0, helpers_1.generateHashPassword)(password);
            const newUser = yield models_1.User.create({
                username: username,
                password: newPassword,
            });
            res.send({ message: "User created", user: newUser });
            return;
        }
        catch (error) {
            console.log(error);
            res.send({ message: "Error at creating user" });
        }
    });
}
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = req.body;
        try {
            const user = yield models_1.User.findOne({ where: { username: username } });
            if (!user) {
                res.send({ message: "U should register before accessing" });
                return;
            }
            // ADD bycript to this part
            if (password && user.password) {
                console.log(password);
                console.log(user.password);
                if (!(yield (0, helpers_1.checkPassword)(password, user.password))) {
                    res.send({ message: "Not correct password" });
                    return;
                }
            }
            if (typeof user.id != "number") {
                throw new Error("Not valid type of id");
            }
            let accessToken = (0, helpers_1.getAccessToken)(user.id);
            res.send({ message: "user can play games", accessToken: accessToken });
            // here i should redirect to games frontend
            // res.redirect("http://localhost:5173");
        }
        catch (error) {
            res.send({ message: "login failed" });
        }
    });
}
