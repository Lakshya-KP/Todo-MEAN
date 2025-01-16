import express, { Router } from 'express';
import cors from 'cors';
import { environment } from '../env';
import { connectDB } from "database"
import { RouterA } from './router';
import { TodoConnector } from 'database/mongodb-todo';
import { TodoAPIs } from '../app-server-apis/todo-apis';
import bodyParser from 'body-parser';

const app = express(); // express app
const router = Router(); // router 

const init = async () => {
    app.use(cors());
    app.use(bodyParser.json());
    app.use('/api', router);

    const db = await connectDB(environment.MONGO_URI, environment.DB_NAME);
    const todoConnector: TodoConnector = new TodoConnector(db);

    app.listen(environment.PORT, () => {
        console.log(`Server running on port ${environment.PORT}`)
    }
    );
    const todoAPIs = new TodoAPIs(todoConnector);


    RouterA(router, todoAPIs);
}

export { app, init }