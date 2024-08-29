"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_ALGO = exports.JWT_OPTIONS_MIDDLEWARE = exports.CORS_OPTIONS_DOCKER = exports.CORS_OPTIONS = exports.COOKIE_OPTIONS = exports.BCRYPT_SALTROUNDS = exports.JWT_EXPIRATIONTIME = exports.JWT_PRIVATEKEY = exports.MYSQL_PASSWORD = exports.MYSQL_USERNAME = exports.MYSQL_DIALECT = exports.MYSQL_DATABASE = exports.MYSQL_PORT = exports.MYSQL_HOST_DOCKER = exports.MYSQL_HOST = exports.PORT = exports.DOCKER = void 0;
const DOCKER = false;
exports.DOCKER = DOCKER;
const PORT = 3000;
exports.PORT = PORT;
const MYSQL_HOST = "0.0.0.0";
exports.MYSQL_HOST = MYSQL_HOST;
const MYSQL_HOST_DOCKER = "database";
exports.MYSQL_HOST_DOCKER = MYSQL_HOST_DOCKER;
const MYSQL_PORT = 3306;
exports.MYSQL_PORT = MYSQL_PORT;
const MYSQL_DATABASE = "gamePlatform";
exports.MYSQL_DATABASE = MYSQL_DATABASE;
const MYSQL_DIALECT = "mysql";
exports.MYSQL_DIALECT = MYSQL_DIALECT;
const MYSQL_USERNAME = "root";
exports.MYSQL_USERNAME = MYSQL_USERNAME;
const MYSQL_PASSWORD = "root";
exports.MYSQL_PASSWORD = MYSQL_PASSWORD;
const JWT_PRIVATEKEY = "privateKey";
exports.JWT_PRIVATEKEY = JWT_PRIVATEKEY;
const JWT_ALGO = "HS256";
exports.JWT_ALGO = JWT_ALGO;
const JWT_EXPIRATIONTIME = "1h";
exports.JWT_EXPIRATIONTIME = JWT_EXPIRATIONTIME;
const JWT_OPTIONS_MIDDLEWARE = {
    secret: JWT_PRIVATEKEY,
    // getToken: (req) => req.cookies.token,
    algorithms: [JWT_ALGO],
};
exports.JWT_OPTIONS_MIDDLEWARE = JWT_OPTIONS_MIDDLEWARE;
const BCRYPT_SALTROUNDS = 10;
exports.BCRYPT_SALTROUNDS = BCRYPT_SALTROUNDS;
const COOKIE_OPTIONS = {
    maxAge: 1000 * 60 * 1, // expire after 15 minutes
    // httpOnly: true, // Cookie will not be exposed to client side code
    // sameSite: "none", // If client and server origins are different
    secure: true, // use with HTTPS only
};
exports.COOKIE_OPTIONS = COOKIE_OPTIONS;
const CORS_OPTIONS = {
    origin: "http://0.0.0.0:4500",
    credentials: true,
};
exports.CORS_OPTIONS = CORS_OPTIONS;
const CORS_OPTIONS_DOCKER = {
    origin: "http://frontend:4500",
    credentials: true,
};
exports.CORS_OPTIONS_DOCKER = CORS_OPTIONS_DOCKER;
