import { User } from "../database/models";
import { UserInteface } from "../types";
import express from "express";
import { checkPassword, generateHashPassword, getAccessToken } from "./helpers";

async function addUser(req: express.Request, res: express.Response) {
    // console.log(req.body)
    const { username, password, confirmPassword } = req.body;
    try {
        const user = await User.findOne({ where: { username: username } });
        console.log(user);
        if (user) {
            res.send({ message: "User already in the database" });
            return;
        }
        if (password != confirmPassword) {
            res.send({ message: "passwords are different" });
            return;
        }
        let newPassword = await generateHashPassword(password);
        const newUser = await User.create({
            username: username,
            password: newPassword,
        });
        res.send({ message: "User created", user: newUser });
        return;
    } catch (error) {
        console.log(error);
        res.send({ message: "Error at creating user" });
    }
}
async function login(req: express.Request, res: express.Response) {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username: username } });
        if (!user) {
            res.send({ message: "U should register before accessing" });
            return;
        }
        // ADD bycript to this part
        if (password && user.password) {
            console.log(password);
            console.log(user.password);
            if (!(await checkPassword(password, user.password))) {
                res.send({ message: "Not correct password" });
                return;
            }
        }
        if (typeof user.id != "number") {
            throw new Error("Not valid type of id");
        }
        let accessToken = getAccessToken(user.id);
        res.send({ message: "user can play games", accessToken: accessToken });
        // here i should redirect to games frontend
    } catch (error) {
        res.send({ message: "login failed" });
    }
}
export { addUser, login };
