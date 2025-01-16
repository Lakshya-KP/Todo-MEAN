// model / schema 
export class Todo {
    title: string;
    description: string;
    isActive: boolean;
    
    constructor(title: string, description: string, isActive: boolean = true){
        this.title = title;
        this.description = description;
        this.isActive = isActive;
    }

    static getDefaultTodo(): Todo{
        return new Todo('','');
    }

    // json object se class bana di ... easy 
    static fromJSON(todoObject: any): Todo | null{
        let todo:Todo | null = null;
        if(todoObject){
            todo =  this.getDefaultTodo();
            todo.title = todoObject.title ?? '';
            todo.description = todoObject.description ?? '';
            todo.isActive = todoObject.isActive ?? true;
        }
        return todo;
    }
}