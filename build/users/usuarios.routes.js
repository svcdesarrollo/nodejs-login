"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_controller_1 = __importDefault(require("./controllers/usuario.controller"));
const CommonRoutesConfig_1 = require("../common/CommonRoutesConfig");
const usuario_middleware_1 = require("./middlewares/usuario.middleware");
const common_permiso_middleware_1 = require("../common/middlewares/common.permiso.middleware");
class UsuariosRoutes extends CommonRoutesConfig_1.CommonRoutesConfig {
    configureRoutes() {
        const usuarioMiddleware = usuario_middleware_1.UsuariosMiddleware.getInstance();
        const commonPermissionMiddleware = new common_permiso_middleware_1.CommonPermisoMiddleware();
        this.router.get('/usuarios', 
        //commonPermissionMiddleware.soloAdministrador,
        usuario_controller_1.default.listUsuario);
        this.router.get('/usuarios/:idUsuario', usuarioMiddleware.validatUsuarioExists, usuario_controller_1.default.getUsuarioById);
        this.router.post('/usuarios', usuarioMiddleware.validateRequiredCreateUsuarioBodyFields, usuarioMiddleware.validateSameEmailDoesntExist, usuario_controller_1.default.addUsuario);
        this.router.put('/usuarios/:idUsuario', usuarioMiddleware.validatUsuarioExists, usuario_controller_1.default.updateUsuario);
        this.router.delete('/usuarios/:idUsuario', usuarioMiddleware.validatUsuarioExists, usuario_controller_1.default.removeUsuario);
    }
}
const usuarioRoutes = new UsuariosRoutes();
exports.default = usuarioRoutes.router;
