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
exports.AuthController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const config_1 = __importDefault(require("../../common/config"));
class AuthController {
    createJWT(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let refreshId = req.body.idUsuario + config_1.default.security.jwtSecret;
                let salt = crypto_1.default.randomBytes(16).toString('base64');
                let hash = crypto_1.default.createHmac('sha512', salt).update(refreshId).digest("base64");
                req.body.refreshKey = salt;
                let token = jsonwebtoken_1.default.sign(req.body, config_1.default.security.jwtSecret, { expiresIn: config_1.default.security.tokenExpiration });
                let b = Buffer.from(hash);
                let refreshToken = b.toString('base64');
                return res.status(201).send({ accessToken: token, refreshToken: refreshToken });
            }
            catch (err) {
                return res.status(500).send(err);
            }
        });
    }
}
exports.AuthController = AuthController;
exports.default = new AuthController();
