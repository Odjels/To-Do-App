import { Injectable } from '@nestjs/common';

export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority?: 'low' | 'medium' | 'high';
  createdAt?: Date;
  updatedAt?: Date;
  dueDate?: Date;
}

@Injectable()
export class TodoService {
  private todos: Todo[] = [];

  create(todo: { title: string; description?: string }) {
    const newTodo: Todo = {
      id: this.todos.length + 1,
      title: todo.title,
      description: todo.description || '',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  findAllTodos() {
    return this.todos;
  }

  findOneTodo(id: number) {
    const todo = this.todos.find((todo) => todo.id === id);
    return todo;
  }

  updateTodo(id: number, updatedTodo: { title: string; description?: string }) {
    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, ...updatedTodo };
      }
      return todo;
    });
    return this.findOneTodo(id);
  }

  deleteTodo(id: number) {
    const removeTodo = this.findOneTodo(id);
    this.todos = this.todos.filter((todo) => todo.id !== id);
    return removeTodo;
  }
}
