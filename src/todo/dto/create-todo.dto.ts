import {
  IsString,
  IsOptional,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';

export class CreateTodoDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsOptional()
  description?: string;

  @IsBoolean()
  completed?: boolean;

  @IsOptional()
  @IsEnum(['low', 'medium', 'high'], {
    message: 'Priority is either low, medium, high',
  })
  priority: 'low' | 'medium' | 'high';
}
