"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const config_1 = __importDefault(require("../../common/config"));
class JwtMiddleware {
    verifyRefreshBodyField(req, res, next) {
        if (req.body && req.body.refreshToken) {
            return next();
        }
        else {
            return res.status(400).send({ error: 'Falta en body: refreshToken' });
        }
    }
    ;
    validRefreshNeeded(req, res, next) {
        let b = Buffer.from(req.body.refreshToken, 'base64');
        let refreshToken = b.toString();
        let hash = crypto_1.default.createHmac('sha512', req.jwt.refreshKey).update(req.jwt.idUsuario + config_1.default.security.jwtSecret).digest("base64");
        if (hash === refreshToken) {
            delete req.jwt.iat;
            delete req.jwt.exp;
            req.body = req.jwt;
            return next();
        }
        else {
            return res.status(400).send({ error: 'refresh token invalido' });
        }
    }
    ;
    validJWTNeeded(req, res, next) {
        if (req.headers['authorization']) {
            try {
                let authorization = req.headers['authorization'].split(' ');
                if (authorization[0] !== 'Bearer') {
                    return res.status(401).send();
                }
                else {
                    req.jwt = jsonwebtoken_1.default.verify(authorization[1], config_1.default.security.jwtSecret);
                    console.log(req.jwt);
                    next();
                }
            }
            catch (err) {
                return res.status(403).send();
            }
        }
        else {
            return res.status(401).send();
        }
    }
    ;
}
exports.JwtMiddleware = JwtMiddleware;
exports.default = new JwtMiddleware();
