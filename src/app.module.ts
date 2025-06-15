import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';

import { DatabaseModule } from './database/database.module';
import { TaskModule } from './task/task.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    TodoModule,
    DatabaseModule,
    TaskModule,
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 60000, // Time to live in seconds
        limit: 10, // Maximum number of requests allowed in the ttl period
      },
      {
        name: 'long',
        ttl: 60000, // Time to live in seconds
        limit: 100, // Maximum number of requests allowed in the ttl period
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard, // Use the ThrottlerGuard globally
    },
  ],
})
export class AppModule {}
