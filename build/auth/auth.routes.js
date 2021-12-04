"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const CommonRoutesConfig_1 = require("../common/CommonRoutesConfig");
const AuthController_1 = __importDefault(require("./controllers/AuthController"));
const auth_middleware_1 = __importDefault(require("./middlewares/auth.middleware"));
const jwt_middleware_1 = __importDefault(require("./middlewares/jwt.middleware"));
class AuthRoutes extends CommonRoutesConfig_1.CommonRoutesConfig {
    configureRoutes() {
        this.router.post(`/auth`, [
            auth_middleware_1.default.validateBodyRequest,
            auth_middleware_1.default.verifyUserPassword,
            AuthController_1.default.createJWT
        ]);
        this.router.post(`/auth/refresh-token`, [
            jwt_middleware_1.default.validJWTNeeded,
            jwt_middleware_1.default.verifyRefreshBodyField,
            jwt_middleware_1.default.validRefreshNeeded,
            AuthController_1.default.createJWT
        ]);
    }
}
exports.AuthRoutes = AuthRoutes;
const authRouter = new AuthRoutes();
exports.default = authRouter.router;
