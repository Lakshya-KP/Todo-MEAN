"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoConnector = void 0;
const mongodb_1 = require("mongodb");
class TodoConnector {
    constructor(db) {
        this.db = db;
    }
    async createTodo(todo) {
        const response = await this.db.collection("new-todos").insertOne({ todo });
        if (response.acknowledged) {
            return await this.db.collection("new-todos").findOne({ _id: response.insertedId });
        }
        else {
            return null;
        }
    }
    async readTodos() {
        return await this.db.collection("new-todos").find({}).toArray();
    }
    async updateTodo(id, todo) {
        try {
            const objectId = new mongodb_1.ObjectId(id);
            return await this.db.collection("new-todos").findOneAndUpdate({ _id: objectId }, { $set: { todo } }, { returnDocument: "after" });
        }
        catch (err) {
            console.error("Error updating todo:", err);
            return null;
        }
    }
    async deleteTodo(id) {
        try {
            const objectId = new mongodb_1.ObjectId(id);
            return await this.db.collection("new-todos").deleteOne({ _id: objectId });
        }
        catch (err) {
            console.error("Error deleting todo:", err);
            return null;
        }
    }
}
exports.TodoConnector = TodoConnector;
