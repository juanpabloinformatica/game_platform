import express from "express";
import cors from "cors";
import router from "./routes";
import { PORT } from "../variables";
import "../database/database";
import { addUser, testConnection } from "../database/database";
// import { testConnection } from "../database/database";
//check database

const app = express();

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

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
