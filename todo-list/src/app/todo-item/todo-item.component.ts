import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from 'common/model/todo';
import { TodoService } from '../services/todo.service';
import { NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-todo-item',
  imports: [FormsModule, NgIf],
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent {
  isEditing = false;

  @Input() todoDoc: any; // Input from parent component

  constructor(private todoService: TodoService, private toastr: ToastrService) {
  }

  inputClicked() {
    this.isEditing = false;
  }

  async editTodo(id: string, todo: Todo): Promise<void> {
    console.log('Editing todo:', todo);
    try {
      const updatedTodo = await this.todoService.updateTodo(id, todo);
      console.log('Todo updated successfully:', updatedTodo);
      this.toastr.success('Todo updated successfully!', 'Success');
      this.todoService.sendTodoChangeSignal(true);
      this.isEditing = false;
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  }

  saveChanges(id: string) {
    console.log(id);
    
    console.log('Saving changes for todo:', this.todoDoc);
    // Call editTodo with the current todoDoc data
    if (this.todoDoc) {
      this.editTodo(id, this.todoDoc.todo);
    }
  }
}
