"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const validateJWT_1 = require("../middlewares/validateJWT");
const router = (0, express_1.Router)();
router.route('/').post(user_1.registerUser);
router.route('/login').post(user_1.loginUser);
router.route('/').get(user_1.getUser);
router.route('/:id').get(validateJWT_1.validateJWT, user_1.getUserById);
exports.default = router;
//# sourceMappingURL=user.js.map