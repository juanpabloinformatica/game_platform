import express from "express";
import { expressjwt, Request as JWTRequest } from "express-jwt";
const app = express();
const PORT = 3000;

app.get("/", (_, res) => {
    res.send("hello darling");
});
app.get("/register", (req, res) => { });
app.get("/login", auth, () => { });

app.listen(PORT, () => {
    console.log("listenning");
});
