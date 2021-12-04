import UsuariosController from './controllers/usuario.controller';
import {CommonRoutesConfig}  from '../common/CommonRoutesConfig';
import { UsuariosMiddleware } from './middlewares/usuario.middleware';
import { CommonPermisoMiddleware } from '../common/middlewares/common.permiso.middleware';
import jwtMiddleware from '../auth/middlewares/jwt.middleware';

class UsuariosRoutes extends CommonRoutesConfig {
    configureRoutes():void{
        const usuarioMiddleware=UsuariosMiddleware.getInstance();
        const commonPermissionMiddleware = new CommonPermisoMiddleware();

        this.router.get('/usuarios',
        jwtMiddleware.validJWTNeeded,
        commonPermissionMiddleware.soloAdministrador,
        UsuariosController.listUsuario);

        this.router.get('/usuarios/:idUsuario',
        jwtMiddleware.validJWTNeeded,
        commonPermissionMiddleware.minimoPermisoRequerido(CommonPermisoMiddleware.BASICO_PERMISO),
        commonPermissionMiddleware.mismoUsuarioOAdministrador,
        usuarioMiddleware.validatUsuarioExists,
        UsuariosController.getUsuarioById);

        this.router.post('/usuarios',
        usuarioMiddleware.validateRequiredCreateUsuarioBodyFields,
        usuarioMiddleware.validateSameEmailDoesntExist,
        UsuariosController.addUsuario);

        this.router.put('/usuarios/:idUsuario',
        jwtMiddleware.validJWTNeeded,
        commonPermissionMiddleware.minimoPermisoRequerido(CommonPermisoMiddleware.BASICO_PERMISO),
        commonPermissionMiddleware.mismoUsuarioOAdministrador,
        usuarioMiddleware.validatUsuarioExists,
        UsuariosController.updateUsuario);

        this.router.delete('/usuarios/:idUsuario',
        jwtMiddleware.validJWTNeeded,
        commonPermissionMiddleware.minimoPermisoRequerido(CommonPermisoMiddleware.BASICO_PERMISO),
        commonPermissionMiddleware.mismoUsuarioOAdministrador,
        usuarioMiddleware.validatUsuarioExists,
        UsuariosController.removeUsuario);
    }
}
const usuarioRoutes=new UsuariosRoutes();
export default usuarioRoutes.router;