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
exports.UsuariosMiddleware = void 0;
const usuario_service_1 = __importDefault(require("../services/usuario.service"));
class UsuariosMiddleware {
    static getInstance() {
        if (!UsuariosMiddleware.instance) {
            UsuariosMiddleware.instance = new UsuariosMiddleware();
        }
        return UsuariosMiddleware.instance;
    }
    validateRequiredCreateUsuarioBodyFields(req, res, next) {
        const { email, nombre, password } = req.body;
        if (email && password && nombre) {
            next();
        }
        else {
            res.status(400).send({ error: `Los campos email,nombre,password son obligatorios` });
        }
    }
    validateSameEmailDoesntExist(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield usuario_service_1.default.getUserByEmail(req.body.email);
            if (usuario) {
                res.status(400).send({ error: `El email ya se encuentra registrado` });
            }
            else {
                next();
            }
        });
    }
    validatUsuarioExists(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUsuario } = req.params;
            const usuario = yield usuario_service_1.default.readById(idUsuario);
            if (usuario) {
                next();
            }
            else {
                res.status(404).send({ error: `No se encontro registro del usuario` });
            }
        });
    }
}
exports.UsuariosMiddleware = UsuariosMiddleware;
