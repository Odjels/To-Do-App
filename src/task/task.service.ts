/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';
import { Priority } from 'generated/prisma';

@Injectable()
export class TaskService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createTaskDto: Prisma.TaskCreateInput) {
    return this.databaseService.task.create({
      data: createTaskDto,
    });
  }

  async findAll(priority?: 'low' | 'medium' | 'high') {
    // Import the Priority enum from your Prisma client

    const priorityMap: Record<string, Priority> = {
      low: Priority.LOW,
      medium: Priority.MEDIUM,
      high: Priority.HIGH,
    };
    if (priority)
      return this.databaseService.task.findMany({
        where: { priority: priorityMap[priority] },
      });
    return this.databaseService.task.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.task.findUnique({
      where: { id, },
    });
  }

  async update(id: number, updateTaskDto: Prisma.TaskUpdateInput) {
    return this.databaseService.task.update({
      where: { id, },
      data: updateTaskDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.task.delete({
      where: { id,
      },
    });
  }
}
