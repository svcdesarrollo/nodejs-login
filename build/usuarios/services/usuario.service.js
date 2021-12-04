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
const usuarios_dao_1 = __importDefault(require("../daos/usuarios.dao"));
class UsuarioService {
    create(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return usuarios_dao_1.default.addUsuario(resource);
        });
    }
    updateById(id, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return usuarios_dao_1.default.putUsuarioById(id, resource);
        });
    }
    list(limit, page) {
        return __awaiter(this, void 0, void 0, function* () {
            return usuarios_dao_1.default.getUsuarios(limit, page);
        });
    }
    readById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return usuarios_dao_1.default.getUsuarioById(id);
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return usuarios_dao_1.default.getUsuarioByEmail(email);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return usuarios_dao_1.default.removeUsuarioById(id);
        });
    }
}
exports.default = new UsuarioService();
