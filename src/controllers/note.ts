import { Response } from 'express'
import User, { UserEntry } from '../models/user'
import Note, { NotesEntry } from '../models/note'
import { RequestWithUserId } from '../middlewares/validateJWT'

export const createList = async (req: RequestWithUserId, res: Response): Promise<void> => {
    try {
        const { userId }: any = req

        const user: UserEntry | null = await User.findById(userId)

        if (!user) {
            throw new Error('Invalid user')
        }

        const note: NotesEntry = await Note.create({ ...req.body, userId: user._id })

        await user.updateOne(
            { $push: { note: note } }
        )

        res.status(200).json({
            ok: true,
            message: 'Note created',
            data: note
        })
    } catch (error: any) {
        res.status(404).json({
            ok: false,
            message: 'Note coult not be create',
            data: error.message
        })
    }
}

export const showNotesByUser = async (req: RequestWithUserId, res: Response): Promise<void> => {
    try {
        const { userId }: any = req
        const user: UserEntry | null = await User.findById(userId)

        if (!user) {
            throw new Error('Invalid user')
        }

        const notes: NotesEntry[] = await Note.find({ user: userId });

        res.status(200).json({
            ok: true,
            message: 'Notes founded',
            data: notes
        })
    } catch (error: any) {
        res.status(404).json({
            ok: false,
            message: 'Notes coult not be founded',
            data: error.message
        })
    }
}

export const getNoteById = async (req: RequestWithUserId, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const { userId }: any = req
        const user: UserEntry | null = await User.findById(userId)
        const note: NotesEntry | null = await Note.findById(id)

        if (!user) {
            throw new Error('Invalid user')
        }

        if (!note) {
            throw new Error('Invalid note')
        }

        if (note.userId.toString() !== user._id.toString()) {
            throw new Error("Note does not belong to this user");
        }

        res.status(200).json({
            ok: true,
            message: 'Note found',
            data: note
        })
    } catch (error: any) {
        res.status(404).json({
            ok: false,
            message: 'Note coult not be found',
            data: error.message
        })
    }
}

export const destroyNote = async (req: RequestWithUserId, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const { userId }: any = req
        const note: NotesEntry | null = await Note.findById(id)
        const user: UserEntry | null = await User.findById(userId)

        if (!note) {
            throw new Error('Invalid note')
        }

        if (!user) {
            throw new Error('Invalid user')
        }

        if (note.userId.toString() !== user._id.toString()) {
            throw new Error("Note does not belong to this user");
        }


        await User.updateOne(
            { _id: user._id },
            { $pull: { note: note._id } }
        )


        await Note.findByIdAndDelete(note._id)

        res.status(200).json({
            ok: true,
            message: 'Note deleted',
            data: note
        })
    } catch (error: any) {
        res.status(404).json({
            ok: false,
            message: 'Note coult not be deleted',
            data: error.message
        })
    }
}

export const updateNote = async (req: RequestWithUserId, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const { userId }: any = req
        const note: NotesEntry | null = await Note.findById(id)
        const user: UserEntry | null = await User.findById(userId)

        if (!note) {
            throw new Error('Invalid note')
        }

        if (!user) {
            throw new Error('Invalid user')
        }

        if (note.userId.toString() !== user._id.toString()) {
            throw new Error("Note does not belong to this user");
        }

        const UpdateNote: NotesEntry | null = await Note.findByIdAndUpdate(
            note._id,
            req.body,
            {
                new: true,
                runValidators: true,
                context: "query",
            }
        );

        res.status(200).json({
            ok: true,
            message: 'Note updated',
            data: UpdateNote
        })
    } catch (error: any) {
        res.status(404).json({
            ok: false,
            message: 'Note coult not be updated',
            data: error.message
        })
    }
}

