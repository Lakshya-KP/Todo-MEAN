"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = void 0;
// model / schema 
class Todo {
    constructor(title, description, isActive = true) {
        this.title = title;
        this.description = description;
        this.isActive = isActive;
    }
    static getDefaultTodo() {
        return new Todo('', '');
    }
    // json object se class bana di ... easy 
    static fromJSON(todoObject) {
        let todo = null;
        if (todoObject) {
            todo = this.getDefaultTodo();
            todo.title = todoObject.title ?? '';
            todo.description = todoObject.description ?? '';
            todo.isActive = todoObject.isActive ?? true;
        }
        return todo;
    }
}
exports.Todo = Todo;
