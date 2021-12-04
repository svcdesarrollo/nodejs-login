"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsersControllers_1 = __importDefault(require("../controllers/UsersControllers"));
const auth_1 = __importDefault(require("../middlewares/auth"));
class UsersRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/user/list', auth_1.default.auth, UsersControllers_1.default.List);
        this.router.post('/user/login', UsersControllers_1.default.Login);
        this.router.post('/user/register', UsersControllers_1.default.Register);
    }
}
const usersRoutes = new UsersRoutes();
exports.default = usersRoutes.router;
