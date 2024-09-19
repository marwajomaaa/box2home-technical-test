import { Module } from '@nestjs/common'
import { TaskController } from 'src/controllers/tasks.controllers'
import { TaskService } from 'src/services/tasks.services'
import { DatabaseModule } from './database.module'
import { tasksProviders } from 'src/providers/tasks.providers'
import { JwtService } from '@nestjs/jwt'
import { TaskGateway } from 'src/websocket'

@Module({
  imports: [DatabaseModule],
  controllers: [TaskController],
  providers: [...tasksProviders, TaskService, TaskGateway, JwtService],
  exports: [],
})
export class TasksModule {}
