import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { instance } from '../../app-server-connector/server-connector';
import { Todo } from 'common/model/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private subject = new Subject<boolean>();
  observable$ = this.subject.asObservable();
  observableTodoChange$ = this.subject.asObservable();

  constructor() { }

  sendCloseSignal(data){
    console.log("Sending close signal",data);
    this.subject.next(data);
  }

  sendTodoChangeSignal(data){
    console.log("Sending todo change signal",data);
    this.subject.next(data);
  }

  async addTodo(todo:Todo): Promise<any> {
    try {
      console.log(todo);
      const response = await instance.post(`/create-todo`, {todo}); 
      return response.data;
    } catch (error) { 
      console.error("Error adding todo:", error);
      throw error;
    }
  }

  async getTodos(): Promise<any> {
    try {
      console.log("Get Todos Called");
      const response = await instance.get(`/get-todos`);
      console.log("Response from server", response.data);
      return response.data;
    } catch (error) {
      console.log("Error getting todos", error);
      throw error;
    }
  }

  async updateTodo(id: string, todo: Todo): Promise<any> {
    try {
      console.log("service update todo called");
      console.log(todo);
      const response = await instance.put(`/update-todo/${id}`, {todo});
      return response.data;
    } catch (error) { 
      console.error("Error updating todo:", error);
      throw error;
    }
  }

}
