import { model, Schema, Document } from 'mongoose';
import { NotesEntry } from './note'

export interface UserEntry extends Document {
    id: string,
    name: string,
    email: string,
    password: string,
    note: NotesEntry[]
    createdAt: Date | string,
    updatedAt: Date | string,
}

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "name is required"],
    },
    email: {
        type: String,
        required: [true, "email is required"],
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    note: [{ type: Schema.Types.ObjectId, ref: 'Note' }]
},
    {
        timestamps: true
    })


export default model<UserEntry>('User', userSchema)