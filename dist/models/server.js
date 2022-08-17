"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("../routes/user"));
class Server {
    constructor() {
        this.apiPaths = {
            user: '/api/user'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "8080";
        this.middlewares();
        this.routes();
    }
    middlewares() {
        //CORS
        this.app.use((0, cors_1.default)());
        //Lectura del body
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use(this.apiPaths.user, user_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Server run in port " + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map