"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3000;
app.get("/", (_, res) => {
    res.send("hello darling");
});
app.get("/register", (req, res) => { });
app.get("/login", auth, () => { });
app.listen(PORT, () => {
    console.log("listenning");
});
//# sourceMappingURL=server.js.map