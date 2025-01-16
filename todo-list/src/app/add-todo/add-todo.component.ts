import { Component, Output } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-todo',
  standalone: true, 
  imports: [FormsModule, NgIf], 
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent {
  @Output() todoClose: EventEmitter<boolean> = new EventEmitter();

  newTodo = {
    title: '',
    description: '',
    isActive: true
  };

  constructor(private todoService: TodoService, private toastr: ToastrService) { }

  closeTodo() {
    this.todoService.sendCloseSignal(true);
  }

  closeTodoByEmit() {
    this.todoClose.emit(true);
  }

  async addNewTodo(form: any): Promise<void> {
    if (form.invalid) {
      console.error('Form is invalid');
      return;
    }

    try {
      const addedTodo = await this.todoService.addTodo(this.newTodo);
      console.log('Todo added successfully:', addedTodo);
      form.resetForm(); 
      this.closeTodo();
      this.toastr.success('Todo added successfully!', 'Success');
    } catch (error) {
      this.toastr.error('Error adding todo!', 'Error');
      console.error('Error adding todo:', error);
    }
  }
}
