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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.registerUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //   const newUser = await toNewUserEntry(req.body)
        //   // Verificar que el email no exista
        //   const email: string = newUser.email
        //   const emailExists: UserEntry | null = await User.findOne({ email })
        //   if (emailExists) {
        //     throw new Error('the email already exists')
        //   }
        //   // Encrypta la contraseña
        //   const encryptPassword = await bcrypt.hash(newUser.password, 8)
        const user = yield user_1.default.create(Object.assign({}, req.body));
        // Generar el JWT
        // const token = await JWTgenerator(user.id)
        res.status(200).json({
            ok: true,
            message: 'User created',
            data: user,
        });
    }
    catch (error) {
        res.status(404).json({
            ok: false,
            message: 'User coult not be create',
            data: error.message
        });
    }
});
exports.registerUser = registerUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.find();
        res.status(200).json({
            ok: true,
            message: 'User found',
            data: user,
        });
    }
    catch (error) {
        res.status(404).json({
            ok: false,
            message: 'User coult not be found',
            data: error.message
        });
    }
});
exports.getUser = getUser;
//# sourceMappingURL=user.js.map