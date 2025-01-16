import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { NgIf } from '@angular/common';
import { TodoService } from './services/todo.service';
import { TodosComponent } from './todos/todos.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AddTodoComponent, NgIf, TodosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todo-list';
  
  showAddTodo: boolean = false;

  constructor(private todoService: TodoService) {
    console.log("Constructor");
  }

  ngOnInit() {
    this.todoService.observable$.subscribe(()=>{
      console.log("Observable subscribed");
      this.showAddTodo = false;
    });
  }

  toggleAddTodo(){
    console.log("toggleAddTodo called");
    this.showAddTodo = !this.showAddTodo;
  }

  
}
