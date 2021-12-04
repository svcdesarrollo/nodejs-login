"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectBD = void 0;
const mysql_1 = __importDefault(require("mysql"));
const config_1 = __importDefault(require("../common/config"));
const util_1 = __importDefault(require("util"));
function connectBD() {
    const connection = mysql_1.default.createConnection(config_1.default.database);
    return {
        query(sql, args) {
            if (args !== null) {
                sql = mysql_1.default.format(sql, args);
            }
            return util_1.default.promisify(connection.query)
                .call(connection, sql);
        },
        close() {
            if (connection.threadId !== null) {
                util_1.default.promisify(connection.end).call(connection);
            }
        }
    };
}
exports.connectBD = connectBD;
