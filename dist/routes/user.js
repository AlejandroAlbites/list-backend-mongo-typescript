"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const router = (0, express_1.Router)();
router.route('/').post(user_1.registerUser);
router.route('/').get(user_1.getUser);
exports.default = router;
//# sourceMappingURL=user.js.map