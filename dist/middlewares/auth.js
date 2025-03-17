"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const env_1 = require("../config/env");
const authenticate = (req, res, next) => {
    const apiKey = req.headers.authorization;
    if (!apiKey || apiKey !== `Bearer ${env_1.config.printfulApiKey}`) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    next();
};
exports.authenticate = authenticate;
