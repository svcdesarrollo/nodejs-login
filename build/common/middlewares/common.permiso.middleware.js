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
exports.CommonPermisoMiddleware = void 0;
class CommonPermisoMiddleware {
    minimoPermisoRequerido(nivelPermisoRequerido) {
        return (req, res, next) => {
            try {
                let usuarioNivelPermiso = parseInt(req.jwt.nivelPermiso);
                if (usuarioNivelPermiso & Number.parseInt(nivelPermisoRequerido)) {
                    next();
                }
                else {
                    if (usuarioNivelPermiso & CommonPermisoMiddleware.MAXIMO_PERMISO) {
                        next();
                    }
                    else {
                        res.status(403).send({});
                    }
                }
            }
            catch (e) {
                console.log(e);
            }
        };
    }
    ;
    mismoUsuarioOAdministrador(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let usuarioNivelPermiso = parseInt(req.jwt.nivelPermiso);
            let idUsuario = req.jwt.idUsuario;
            if (req.params && req.params.idUsuario && idUsuario === Number.parseInt(req.params.idUsuario)) {
                return next();
            }
            else {
                if (usuarioNivelPermiso & CommonPermisoMiddleware.MAXIMO_PERMISO) {
                    return next();
                }
                else {
                    return res.status(403).send({});
                }
            }
        });
    }
    ;
    soloAdministrador(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let usuarioNivelPermiso = parseInt(req.jwt.nivelPermiso);
            if (usuarioNivelPermiso & CommonPermisoMiddleware.MAXIMO_PERMISO) {
                return next();
            }
            else {
                return res.status(403).send({});
            }
        });
    }
    ;
}
exports.CommonPermisoMiddleware = CommonPermisoMiddleware;
CommonPermisoMiddleware.MAXIMO_PERMISO = 16 * 2; //4096*2
CommonPermisoMiddleware.BASICO_PERMISO = 1;
