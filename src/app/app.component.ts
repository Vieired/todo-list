import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.models';
import { TodoListService } from './app.service';

@Component({
  selector: 'app-root', // <app-root></app-root>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public form: FormGroup;
  public todos: Todo[] = [];
  todoList: Todo[];

  constructor(
    private fb: FormBuilder,
    private service: TodoListService
  ) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    })
    
    // this.load();
  }

  ngOnInit() {
    this.service.list()
      .subscribe(data => this.todoList = data);
  }

  load() {
    this.todos.push({
      title: 'Passear com o cachorro',
      done: false
    });
    this.todos.push({
      title: 'Ir ao supermercado',
      done: false
    }); 
  }

  addTodo() {
    const title = this.form.controls['title'].value;
    this.todos.push(new Todo(title, false));
    this.form.reset();
  }

  removeTodo(todo: Todo) {
    const index = this.todos.indexOf(todo);
    this.todos.splice(index, 1);
  }

  markAsDone(todo: Todo) {
    todo.done = true;
  }
}
