"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = __importDefault(require("./src/models/server"));
const db_1 = require("./src/db/db");
dotenv_1.default.config();
(0, db_1.connectDb)();
const server = new server_1.default();
server.listen();
//# sourceMappingURL=app.js.map