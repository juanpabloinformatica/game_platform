import {
    DOCKER,
    MYSQL_HOST,
    MYSQL_DATABASE,
    MYSQL_DIALECT,
    MYSQL_PASSWORD,
    MYSQL_PORT,
    MYSQL_USERNAME,
    MYSQL_HOST_DOCKER,
} from "../variables";
import { User } from "./models";
import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize({
    host: DOCKER ? MYSQL_HOST_DOCKER : MYSQL_HOST,
    port: MYSQL_PORT,
    database: MYSQL_DATABASE,
    dialect: MYSQL_DIALECT,
    username: MYSQL_USERNAME,
    password: MYSQL_PASSWORD,
});
sequelize.addModels([User]);
console.log(DOCKER)
const addUser = async () => {
    await User.create({ username: "robin", password: "david" });
};
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
        console.log(sequelize);
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

export { testConnection, addUser };
