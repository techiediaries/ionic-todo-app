import { Component, OnInit } from '@angular/core';
import { TodosService } from '../todos.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public todos: Array<{ title: string; note: string; completed: boolean}> = [];
  
  isCompleted(todo){
    if(todo.completed) return 'checkmark-circle';
    else return 'stopwatch';
  }
  constructor(private todosService: TodosService) {
  }

  async ngOnInit(){

    this.todos = await this.todosService.getTodos();

  }

  public async createTodo(){
    let key = await this.todosService.generateNewKey();
    let todo = {
      title: `${key}`,
      note: "A new todo",
      completed: true
    };
    await this.todosService.createTodo(key,todo);
    this.todos = await this.todosService.getTodos();
  }
}
