import {Router} from 'express';
import { todoRoutes } from './child-routes/todo-routes';
import { TodoConnector } from 'database/mongodb-todo';
import { TodoAPIs } from '../app-server-apis/todo-apis';
export function RouterA(
    router: Router,
    todoAPis: TodoAPIs,
){
    // routes define honge ....
    todoRoutes(router,todoAPis)
}