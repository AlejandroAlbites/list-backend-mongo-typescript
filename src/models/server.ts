import express from 'express'
import cors from 'cors'
import userRoutes from '../routes/user';
import noteRoutes from '../routes/note';


class Server {

    private app: express.Application;
    private port: string
    private apiPaths = {
        user: '/api/user',
        note: '/api/note'
    }


    constructor() {
        this.app = express();
        this.port = process.env.PORT || "8080";
        this.middlewares();
        this.routes();

    }
    middlewares() {
        this.app.use(cors());
        this.app.use(express.json())
    }

    routes() {
        this.app.use(this.apiPaths.user, userRoutes);
        this.app.use(this.apiPaths.note, noteRoutes);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Server run in port " + this.port);
        })
    }
}

export default Server;