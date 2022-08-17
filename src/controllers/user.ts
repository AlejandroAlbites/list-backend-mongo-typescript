import { Request, Response } from 'express'
import User, { UserEntry } from "../models/user"
import { JWTgenerator } from "../helpers/generateJWT"
import bcrypt from 'bcrypt'

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const email: string = req.body.email
        const password: string = req.body.password

        const emailExists: UserEntry | null = await User.findOne({ email })

        if (emailExists) {
            throw new Error('the email already exists')
        }

        const encryptPassword = await bcrypt.hash(password, 8)
        const user: UserEntry = await User.create({ ...req.body, password: encryptPassword })

        const token = await JWTgenerator(user._id)

        res.status(200).json({
            ok: true,
            message: 'User created',
            data: user,
            token,
        })
    } catch (error: any) {
        res.status(404).json({
            ok: false,
            message: 'User coult not be create',
            data: error.message
        })
    }
}

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const email: string = req.body.email
        const password: string = req.body.password

        const userDB: UserEntry | null = await User.findOne({ email })

        if (!userDB) {
            throw new Error('the email does not exist')
        }

        const validPassword = bcrypt.compareSync(password, userDB.password)
        if (!validPassword) {
            throw new Error('the password is incorrect')
        }

        const token = await JWTgenerator(userDB._id)

        res.status(200).json({
            ok: true,
            message: 'User logged',
            data: userDB,
            token,
        })
    } catch (error: any) {
        res.status(404).json({
            ok: false,
            message: 'User coult not be create',
            data: error.message
        })
    }
}

export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {

        const user: UserEntry[] = await User.find()


        res.status(200).json({
            ok: true,
            message: 'User found',
            data: user,
        })
    } catch (error: any) {
        res.status(404).json({
            ok: false,
            message: 'User coult not be found',
            data: error.message
        })
    }
}

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const { userId }: any = req
        const user: UserEntry | null = await User.findById(id)
            .select('-password')
        if (!user || user._id.toString() !== userId) {
            throw new Error('the user does not exist')
        }
        res.status(200).json({
            ok: true,
            message: 'User found',
            data: user,
        })
    } catch (error: any) {
        res.status(404).json({
            ok: false,
            message: 'User coult not be found',
            data: error.message
        })
    }
}