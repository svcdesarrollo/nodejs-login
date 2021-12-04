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
Object.defineProperty(exports, "__esModule", { value: true });
const conMysql_1 = require("../../common/services/conMysql");
class UsuariosDao {
    constructor() {
        this.usuarios = [];
    }
    addUsuario(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = "INSERT INTO usuarios SET ?";
            const cn = (0, conMysql_1.connectBD)();
            let message;
            try {
                const rows = yield cn.query(query, usuario);
                rows.affectedRows > 0 ?
                    message = { message: "Usuario registrado" }
                    :
                        message = { error: "Al guardar los datos del usuario" };
            }
            catch (err) {
                console.log(err);
                message = { error: "Al guardar los datos del usuario" };
            }
            finally {
                cn.close();
            }
            return message;
        });
    }
    getUsuarios(limit, page) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = "SELECT id,email,nombre,apellidos,password,nivelPermiso FROM usuarios ORDER BY Nombre DESC";
            if (limit > 0 && page > 0)
                query = query + ' LIMIT ? OFFSET ?';
            const cn = (0, conMysql_1.connectBD)();
            try {
                const rows = yield cn.query(query, [(limit * 1), (page - 1) * limit]);
                this.usuarios = rows;
            }
            catch (err) {
                console.log(err);
            }
            finally {
                cn.close();
            }
            return this.usuarios;
        });
    }
    getUsuarioById(usuarioId) {
        return __awaiter(this, void 0, void 0, function* () {
            let usuario;
            var query = "SELECT id,email,nombre,apellidos,password,nivelPermiso FROM usuarios WHERE id=?";
            const cn = (0, conMysql_1.connectBD)();
            try {
                const row = yield cn.query(query, usuarioId);
                if (row.length > 0)
                    usuario = row;
            }
            catch (err) {
                console.log(err);
            }
            finally {
                cn.close();
            }
            return usuario;
        });
    }
    putUsuarioById(usuarioId, usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = "UPDATE usuarios SET ? WHERE id=?";
            const cn = (0, conMysql_1.connectBD)();
            let message;
            try {
                const rows = yield cn.query(query, [usuario, usuarioId]);
                rows.affectedRows > 0 ?
                    message = { message: "Se actualizo exitosamente" }
                    :
                        message = { error: "Al actualizar los datos del usuario" };
            }
            catch (err) {
                message = { error: "Al conectarse con la base de datos" };
            }
            finally {
                cn.close();
            }
            return message;
        });
    }
    removeUsuarioById(usuarioId) {
        return __awaiter(this, void 0, void 0, function* () {
            let message;
            var query = "DELETE FROM usuarios WHERE id=?";
            const cn = (0, conMysql_1.connectBD)();
            try {
                const row = yield cn.query(query, usuarioId);
                row.affectedRows > 0 ?
                    message = { message: ` Usuario ${usuarioId} eliminado` }
                    :
                        message = { error: `Al eliminar el usuario ${usuarioId}` };
            }
            catch (err) {
                message = { error: "Al conectarse con la base de datos" };
            }
            finally {
                cn.close();
            }
            return message;
        });
    }
    getUsuarioByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            let usuario;
            var query = "SELECT id,email,nombre,apellidos,password,nivelPermiso FROM usuarios WHERE email=?";
            const cn = (0, conMysql_1.connectBD)();
            try {
                const row = yield cn.query(query, email);
                if (row.length > 0)
                    usuario = row;
            }
            catch (err) {
                console.log(err);
            }
            finally {
                cn.close();
            }
            return usuario;
        });
    }
}
exports.default = new UsuariosDao();
