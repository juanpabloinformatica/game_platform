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
exports.getAccessToken = getAccessToken;
exports.generateHashPassword = generateHashPassword;
exports.checkPassword = checkPassword;
exports.checkAccessToken = checkAccessToken;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const variables_1 = require("../variables");
function getAccessToken(userId) {
    const accessToken = jsonwebtoken_1.default.sign({ userId: userId }, variables_1.JWT_PRIVATEKEY, {
        algorithm: variables_1.JWT_ALGO,
        expiresIn: variables_1.JWT_EXPIRATIONTIME,
    });
    return accessToken;
}
function checkAccessToken(token) {
    console.log(jsonwebtoken_1.default.verify(token, variables_1.JWT_PRIVATEKEY));
    return jsonwebtoken_1.default.verify(token, variables_1.JWT_PRIVATEKEY);
}
function generateSalt() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let salt = yield bcrypt_1.default.genSalt(variables_1.BCRYPT_SALTROUNDS);
            return salt;
        }
        catch (error) {
            throw new Error(`Error at creating the salt ${error}`);
        }
    });
}
function generateHashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let salt = yield generateSalt();
            let hashPassword = yield bcrypt_1.default.hash(password, salt);
            console.log(hashPassword);
            return hashPassword;
        }
        catch (error) {
            throw new Error(`error at hashing the password ${error}`);
        }
    });
}
function checkPassword(tempPassword, realHashPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield bcrypt_1.default.compare(tempPassword, realHashPassword);
        }
        catch (error) {
            throw new Error(`error at checking password with database`);
        }
    });
}
