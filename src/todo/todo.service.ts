import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { NotFoundException } from '@nestjs/common';

export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  priority?: 'low' | 'medium' | 'high';
  createdAt?: Date;
  updatedAt?: Date;
}

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    {
      id: 1,
      title: 'Sample Task',
      description: 'Sample Description',
      completed: false,
      priority: 'low' as const, // Use 'as const' to ensure correct typing

      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      title: 'Another Task',
      description: undefined, // Make it explicit
      completed: true,
      priority: 'high' as const,

      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      title: 'Sample Task',
      description: 'Sample Description',
      completed: false,
      priority: 'medium' as const,

      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  private nextId = 1; // Add this counter

  create(createTodoDto: CreateTodoDto) {
    const newTodo: Todo = {
      id: this.nextId++,
      title: createTodoDto.title || '',
      description: createTodoDto.description || '',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),

      priority: createTodoDto.priority,
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  findAllTodos() {
    return this.todos;
  }

  findOneTodo(id: number) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
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
