import dotenv from 'dotenv';
import Server from './src/models/server';
import { connectDb } from './src/db/db'

dotenv.config()

connectDb()
const server = new Server();

server.listen();