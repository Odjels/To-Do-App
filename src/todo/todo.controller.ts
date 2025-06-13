import {
  Controller,
  Delete,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

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
  create(@Body(ValidationPipe) createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
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
    return this.todoService.findAllTodos();
  }

  @Get(':id')
  findOneTodo(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.findOneTodo(id);
  }

  @Patch(':id')
  updateTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateTodoDto: UpdateTodoDto,
  ) {
    return this.todoService.updateTodo(id, updateTodoDto);
  }

  @Patch(':id/complete')
  markComplete(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.markComplete(id);
  }

  @Patch(':id/incomplete')
  markIncomplete(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.markIncomplete(id);
  }

  @Delete(':id')
  deleteTodo(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.deleteTodo(id);
  }
}
