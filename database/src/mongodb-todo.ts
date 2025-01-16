import { Db, ObjectId } from "mongodb";
import {Todo} from "common/model/todo";

export class TodoConnector {

    private db: Db;

    constructor(db: Db){
        this.db = db;
    }

    async createTodo(todo:Todo){
        const response = await this.db.collection("new-todos").insertOne({todo});
        if (response.acknowledged) {
            return await this.db.collection("new-todos").findOne({_id: response.insertedId});
        } else {            
            return null;
        }
    }

    async readTodos(){
        return await this.db.collection("new-todos").find({}).toArray();
    }


    async updateTodo(id: string, todo: Todo) {
        try {
            const objectId = new ObjectId(id);
            return await this.db.collection("new-todos").findOneAndUpdate(
                { _id: objectId },         
                { $set: { todo } },        
                { returnDocument: "after" } 
            );
        } catch (err) {
            console.error("Error updating todo:", err);
            return null;
        }
    }

    async deleteTodo(id){
        try {
            const objectId = new ObjectId(id);
            return await this.db.collection("new-todos").deleteOne({_id: objectId});
        } catch (err) {
            console.error("Error deleting todo:", err);
            return null;
        }
    }

}