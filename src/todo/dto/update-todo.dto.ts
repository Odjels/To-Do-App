/* eslint-disable @typescript-eslint/no-unsafe-call */
import { CreateTodoDto } from './create-todo.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  // Additional properties or methods can be added here if needed
  // For example, you might want to add a property to indicate the status of the update
}
