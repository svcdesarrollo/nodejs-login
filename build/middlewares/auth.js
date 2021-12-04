"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
class VerifyToken {
    auth(req, res, next) {
        const token = req.headers['x-access-token'];
        if (!token) {
            return res.status(400).send("No se ha enviado el token de autenticación");
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.KEY || 'Generic');
        }
        catch (err) {
            return res.status(401).send("Token inválido");
        }
        return next();
    }
}
const verifyToken = new VerifyToken();
exports.default = verifyToken;
