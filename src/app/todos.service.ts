import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

interface Todo{
  title: string; 
  note: string;
  completed: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private storage: Storage) { 

  }

  public async generateNewKey(): Promise<string>{
    let key = `todo${ parseInt(`${Math.random() * 100}`)}`;
    let ret = await this.storage.get(key);
    
    while(ret){
      key = `todo${ parseInt(`${Math.random() * 100}`)}`;
      ret = await this.storage.get(key);
    }
    return key;
  }
  public async getTodos(): Promise<Todo[]>{
    
    let todos: Array<Todo> = [];
    await this.storage.forEach((v, key, i)=>{
      if(key.startsWith("todo")){
          todos.push(v);
      }
    });

    return todos;
  }

  public async createTodo(key: string , todo: Todo){
    console.log("Creating todo: ", todo);
    return await this.storage.set(key, todo);
  }

  /*public async updateTodo(todo: Todo){
    return await this.storage.set(todo.key, todo);
  }*/
  
  public async deleteTodo(key: string){
    return await this.storage.remove(key);
  }
}
