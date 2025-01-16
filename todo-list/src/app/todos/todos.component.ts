import { Component } from '@angular/core';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { TodoService } from '../services/todo.service';
import { Todo } from 'common/model/todo';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-todos',
  imports: [TodoItemComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})

export class TodosComponent {

  todosDocs: Todo[] = []

  constructor (private todoService: TodoService) {
    this.loadTodos()  // ngOnInit me ye jayega
  }

  ngOnInit() {
    this.todoService.observableTodoChange$.subscribe(()=>{
      console.log("Observable subscribed");
      this.loadTodos();
    });
  }

  loadTodos(){
    this.todoService.getTodos().then((todos) => {
      this.todosDocs = todos;
    });
  }

}
