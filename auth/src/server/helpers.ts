import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
    BCRYPT_SALTROUNDS,
    JWT_ALGO,
    JWT_EXPIRATIONTIME,
    JWT_PRIVATEKEY,
} from "../variables";
function getAccessToken(userId: number) {
    const accessToken = jwt.sign({ userId: userId }, JWT_PRIVATEKEY, {
        algorithm: JWT_ALGO,
        expiresIn: JWT_EXPIRATIONTIME,
    });
    return accessToken;
}
function checkAccessToken(token:string) {
    console.log(jwt.verify(token, JWT_PRIVATEKEY));
    return jwt.verify(token, JWT_PRIVATEKEY);
}
async function generateSalt() {
    try {
        let salt = await bcrypt.genSalt(BCRYPT_SALTROUNDS);
        return salt;
    } catch (error) {
        throw new Error(`Error at creating the salt ${error}`);
    }
}
async function generateHashPassword(password: string) {
    try {
        let salt = await generateSalt();
        let hashPassword = await bcrypt.hash(password, salt);
        console.log(hashPassword);
        return hashPassword;
    } catch (error) {
        throw new Error(`error at hashing the password ${error}`);
    }
}
async function checkPassword(tempPassword: string, realHashPassword: string) {
    try {
        return await bcrypt.compare(tempPassword, realHashPassword);
    } catch (error) {
        throw new Error(`error at checking password with database`);
    }
}

export {
    getAccessToken,
    generateHashPassword,
    checkPassword,
    checkAccessToken,
};
