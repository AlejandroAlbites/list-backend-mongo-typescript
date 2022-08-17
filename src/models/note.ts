import { model, Schema, Document } from 'mongoose';

export interface NotesEntry extends Document {
    id: string,
    name: string,
    text: string,
    favorite: boolean,
    userId: string,
    createdAt: Date | string,
    updatedAt: Date | string,
}

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "name is required"],
    },
    text: {
        type: String,
    },
    favorite: {
        type: String,
        default: false
    },
    userId: {
        type: Schema.Types.String,
        ref: 'User',
        required: [true, "user is required"],
    },
},
    {
        timestamps: true
    })


export default model<NotesEntry>('Note', userSchema)