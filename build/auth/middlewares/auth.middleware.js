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
exports.AuthMiddleware = void 0;
const usuario_service_1 = __importDefault(require("../../usuarios/services/usuario.service"));
const argon2_1 = __importDefault(require("argon2"));
class AuthMiddleware {
    validateBodyRequest(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body && req.body.email && req.body.password) {
                next();
            }
            else {
                res.status(400).send({ error: 'Los campos email y password son requeridos' });
            }
        });
    }
    verifyUserPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield usuario_service_1.default.getUserByEmail(req.body.email);
            if (usuario) {
                let passwordHash = usuario.password;
                try {
                    if (yield argon2_1.default.verify(passwordHash, req.body.password)) {
                        req.body = {
                            idUsuario: usuario.id,
                            email: usuario.email,
                            provider: 'email',
                            nivelPermiso: usuario.nivelPermiso,
                        };
                        return next();
                    }
                    else {
                        res.status(400).send({ errors: `Contraseña incorrecta` });
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }
            else {
                res.status(400).send({ errors: `El correo electronico, no se encuentra registrado` });
            }
        });
    }
}
exports.AuthMiddleware = AuthMiddleware;
exports.default = new AuthMiddleware();
