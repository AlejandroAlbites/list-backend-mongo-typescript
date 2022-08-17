import { Router } from 'express'
import { createList, showNotesByUser, getNoteById, destroyNote, updateNote } from '../controllers/note'
import { validateJWT } from '../middlewares/validateJWT'
const router = Router()

router.route('/').post(validateJWT, createList)
router.route('/').get(validateJWT, showNotesByUser)
router.route('/:id').get(validateJWT, getNoteById)
router.route('/update/:id').put(validateJWT, updateNote)
router.route('/delete/:id').delete(validateJWT, destroyNote)

export default router