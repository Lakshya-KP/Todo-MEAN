import { Todo } from "common/model/todo";
import { TodoConnector } from "database/mongodb-todo";

export class TodoAPIs {
    private todoConnector: TodoConnector;

    constructor(todoConnector: TodoConnector){
        this.todoConnector = todoConnector;
    }

    createTodo(title: string, description: string, active: boolean){    
        const todo = new Todo(title, description, active);
        return this.todoConnector.createTodo(todo);
    }

    createTodoNew(todo: Todo){
        return this.todoConnector.createTodo(todo);
    }

    readTodos(){
        return this.todoConnector.readTodos();
    }

    updateTodo(id: string, todo: Todo) {
        return this.todoConnector.updateTodo(id, todo);
    }

    deleteTodo(id: string){
        return this.todoConnector.deleteTodo(id);
    }
}