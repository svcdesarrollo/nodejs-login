"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonRoutesConfig = void 0;
const express_1 = require("express");
class CommonRoutesConfig {
    constructor() {
        this.router = (0, express_1.Router)();
        this.configureRoutes();
    }
}
exports.CommonRoutesConfig = CommonRoutesConfig;
