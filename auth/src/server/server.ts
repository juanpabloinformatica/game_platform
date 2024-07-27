import express from "express";
import cors from "cors";
import router from "./routes";
// import { CORS_OPTIONS, JWT_OPTIONS_MIDDLEWARE, PORT } from "../variables";
import { CORS_OPTIONS, PORT } from "../variables";
import "../database/database";
import cookieParser from "cookie-parser";
// import { jwt } from "express-jwt";
// import { expressjwt } from "express-jwt";
// import { addUser, testConnection } from "../database/database";
// import { testConnection } from "../database/database";
//check database

const app = express();

// middlewares
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(CORS_OPTIONS));
// app.use(expressjwt(JWT_OPTIONS_MIDDLEWARE));

// add routes
app.use("/", router);

// app.listen(PORT, () => {
//     console.log("listenning");
// });

const init = async () => {
    // await addUser();
    // await testConnection();
    app.listen(PORT, () => {
        console.log("listenning");
    });
};
init();
