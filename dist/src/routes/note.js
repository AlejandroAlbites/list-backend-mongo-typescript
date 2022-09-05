"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const note_1 = require("../controllers/note");
const validateJWT_1 = require("../middlewares/validateJWT");
const router = (0, express_1.Router)();
router.route('/').post(validateJWT_1.validateJWT, note_1.createList);
router.route('/').get(validateJWT_1.validateJWT, note_1.showNotesByUser);
router.route('/:id').get(validateJWT_1.validateJWT, note_1.getNoteById);
router.route('/update/:id').put(validateJWT_1.validateJWT, note_1.updateNote);
router.route('/delete/:id').delete(validateJWT_1.validateJWT, note_1.destroyNote);
exports.default = router;
//# sourceMappingURL=note.js.map