import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  priority?: 'low' | 'medium' | 'high';
  createdAt?: Date;
  updatedAt?: Date;
  dueDate?: Date;
}

@Injectable()
export class TodoService {
  private todos: Todo[] = [];
  private nextId = 1; // Add this counter

  create(createTodoDto: CreateTodoDto) {
    const newTodo: Todo = {
      id: this.nextId++,
      title: createTodoDto.title || '',
      description: createTodoDto.description || '',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),

      priority: createTodoDto.priority as 'low' | 'medium' | 'high',
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

  updateTodo(id: number, updateTodoDto: UpdateTodoDto) {
    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, ...updateTodoDto };
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

  markComplete(id: number) {
    return this.updateTodo(id, { completed: true });
  }

  markIncomplete(id: number) {
    return this.updateTodo(id, { completed: false });
  }
}
