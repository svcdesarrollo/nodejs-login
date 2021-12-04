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
const usuario_service_1 = __importDefault(require("../services/usuario.service"));
const argon2_1 = __importDefault(require("argon2"));
class UsuarioController {
    addUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //req.body.nivelPermiso = 1 + 2 + 4 + 8;
            req.body.password = yield argon2_1.default.hash(req.body.password);
            const { message, error } = yield usuario_service_1.default.create(req.body);
            message ? res.status(201).send(message) : res.status(400).send(error);
        });
    }
    updateUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const idUsuario = req.params.idUsuario;
            const { password, id } = req.body;
            if (password)
                req.body.password = yield argon2_1.default.hash(password);
            if (id)
                delete req.body.id;
            const { message, error } = yield usuario_service_1.default.updateById(idUsuario, req.body);
            message ? res.status(201).send(message) : res.status(400).send(error);
        });
    }
    listUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, limit } = req.query;
            const usuario = yield usuario_service_1.default.list(limit || 0, page || 0);
            res.status(200).send(usuario);
        });
    }
    getUsuarioById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const idUsuario = req.params.idUsuario;
            const usuario = yield usuario_service_1.default.readById(idUsuario);
            res.status(200).send(usuario);
        });
    }
    removeUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const idUsuario = req.params.idUsuario;
            const { message, error } = yield usuario_service_1.default.deleteById(idUsuario);
            message ? res.status(201).send(message) : res.status(400).send(error);
        });
    }
}
exports.default = new UsuarioController();
