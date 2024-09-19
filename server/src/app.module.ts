import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ProjectModule } from './modules/project.module'
import { TasksModule } from './modules/tasks.module'
import { UsersModule } from './modules/user.module'

@Module({
  imports: [UsersModule, TasksModule, ProjectModule, ConfigModule.forRoot()],
})
export class AppModule {}
