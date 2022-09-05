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
exports.getUserById = exports.getUser = exports.loginUser = exports.registerUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const generateJWT_1 = require("../helpers/generateJWT");
const bcrypt_1 = __importDefault(require("bcrypt"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const emailExists = yield user_1.default.findOne({ email });
        if (emailExists) {
            throw new Error('the email already exists');
        }
        const encryptPassword = yield bcrypt_1.default.hash(password, 8);
        const newUser = yield user_1.default.create(Object.assign(Object.assign({}, req.body), { password: encryptPassword }));
        const token = yield (0, generateJWT_1.JWTgenerator)(newUser._id);
        const user = {
            avatar: newUser.avatar,
            name: newUser.name,
            email: newUser.email,
            note: newUser.note,
            _id: newUser._id
        };
        res.status(200).json({
            ok: true,
            message: 'User created',
            data: user,
            token,
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
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const userDB = yield user_1.default.findOne({ email });
        if (!userDB) {
            throw new Error('the email does not exist');
        }
        const validPassword = bcrypt_1.default.compareSync(password, userDB.password);
        if (!validPassword) {
            throw new Error('the password is incorrect');
        }
        const token = yield (0, generateJWT_1.JWTgenerator)(userDB._id);
        const user = {
            avatar: userDB.avatar,
            name: userDB.name,
            email: userDB.email,
            note: userDB.note,
            _id: userDB._id
        };
        res.status(200).json({
            ok: true,
            message: 'User logged',
            data: user,
            token,
        });
    }
    catch (error) {
        res.status(404).json({
            ok: false,
            message: 'User coult not be loggin',
            data: error.message
        });
    }
});
exports.loginUser = loginUser;
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
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req;
        const user = yield user_1.default.findById(userId)
            .select('-password');
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
exports.getUserById = getUserById;
//# sourceMappingURL=user.js.map