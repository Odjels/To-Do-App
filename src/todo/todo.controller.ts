import {
  Controller,
  Delete,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  private todos: {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
    priority?: string;
  }[] = [
    {
      id: 1,
      title: 'Sample Task',
      description: 'Sample Description',
      completed: false,
      priority: 'low',
    },
    { id: 2, title: 'Another Task', completed: true, priority: 'high' },
    {
      id: 3,
      title: 'Sample Task',
      description: 'Sample Description',
      completed: false,
      priority: 'medium',
    },
  ];

  @Post()
  create(
    @Body() todo: { title: string; description?: string; priority?: string },
  ) {
    return this.todoService.create(todo);
  }

  @Get()
  findAllTodos(
    @Query('completed') completed?: string,
    @Query('priority') priority?: string,
  ) {
    if (completed !== undefined) {
      return this.todoService.findAllTodos();
    }
    if (priority !== undefined) {
      return this.todoService.findAllTodos();
    }
  }

  @Get(':id')
  findOneTodo(@Param('id') id: string) {
    return this.todoService.findOneTodo(+id);
  }

  @Patch(':id')
  updateTodo(
    @Param('id') id: string,
    @Body() todoUpdate: { title: string; description?: string },
  ) {
    return this.todoService.updateTodo(+id, todoUpdate);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string) {
    return this.todoService.deleteTodo(+id);
  }
}
