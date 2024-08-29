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
exports.addUser = void 0;
exports.testConnection = testConnection;
const variables_1 = require("../variables");
const models_1 = require("./models");
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize = new sequelize_typescript_1.Sequelize({
    host: variables_1.DOCKER ? variables_1.MYSQL_HOST_DOCKER : variables_1.MYSQL_HOST,
    port: variables_1.MYSQL_PORT,
    database: variables_1.MYSQL_DATABASE,
    dialect: variables_1.MYSQL_DIALECT,
    username: variables_1.MYSQL_USERNAME,
    password: variables_1.MYSQL_PASSWORD,
});
sequelize.addModels([models_1.User]);
console.log(variables_1.DOCKER);
const addUser = () => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.User.create({ username: "robin", password: "david" });
});
exports.addUser = addUser;
function testConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield sequelize.authenticate();
            console.log("Connection has been established successfully.");
            console.log(sequelize);
        }
        catch (error) {
            console.error("Unable to connect to the database:", error);
        }
    });
}
