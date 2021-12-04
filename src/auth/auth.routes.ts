import {CommonRoutesConfig}  from '../common/CommonRoutesConfig';
import AuthController from './controllers/AuthController';
import authMiddleware from './middlewares/auth.middleware';
import jwtMiddleware from './middlewares/jwt.middleware';

export class AuthRoutes extends CommonRoutesConfig{
    configureRoutes() {
        this.router.post(`/auth`, [
            authMiddleware.validateBodyRequest,
            authMiddleware.verifyUserPassword,
            AuthController.createJWT
        ]);

        this.router.post(`/auth/refresh-token`, [
            jwtMiddleware.validJWTNeeded,
            jwtMiddleware.verifyRefreshBodyField,
            jwtMiddleware.validRefreshNeeded,
            AuthController.createJWT
        ]);
    }
}
const authRouter=new AuthRoutes();
export default authRouter.router;
