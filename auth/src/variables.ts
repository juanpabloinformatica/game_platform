const PORT = 3000;
const MYSQL_HOST = "localhost";
const MYSQL_PORT = 3306;
const MYSQL_DATABASE = "gamePlatform";
const MYSQL_DIALECT = "mysql";
const MYSQL_USERNAME = "root";
const MYSQL_PASSWORD = "root";
const JWT_PRIVATEKEY = "privateKey";
const JWT_ALGO = "HS256";
const JWT_EXPIRATIONTIME = "1h";
const JWT_OPTIONS_MIDDLEWARE = {
    secret: JWT_PRIVATEKEY,
    // getToken: (req) => req.cookies.token,
    algorithms: [JWT_ALGO],
};
const BCRYPT_SALTROUNDS = 10;
const COOKIE_OPTIONS = {
    maxAge: 1000 * 60 * 1, // expire after 15 minutes
    // httpOnly: true, // Cookie will not be exposed to client side code
    // sameSite: "none", // If client and server origins are different
    secure: true, // use with HTTPS only
};
const CORS_OPTIONS = {
    origin: "http://localhost:5173",
    credentials: true,
};

export {
    PORT,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_DATABASE,
    MYSQL_DIALECT,
    MYSQL_USERNAME,
    MYSQL_PASSWORD,
    JWT_PRIVATEKEY,
    JWT_EXPIRATIONTIME,
    BCRYPT_SALTROUNDS,
    COOKIE_OPTIONS,
    CORS_OPTIONS,
    JWT_OPTIONS_MIDDLEWARE,
    JWT_ALGO,
};
