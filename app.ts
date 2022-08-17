import dotenv from 'dotenv';
import Server from './src/models/server';
import { connectDb } from './src/db/db'

//configurar variables de entornos
dotenv.config()

connectDb()
const server = new Server();

server.listen();