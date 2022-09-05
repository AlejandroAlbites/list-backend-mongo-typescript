"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
    },
    text: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false
    },
    userId: {
        type: mongoose_1.Schema.Types.String,
        ref: 'User',
        required: [true, "user is required"],
    },
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)('Note', userSchema);
//# sourceMappingURL=note.js.map