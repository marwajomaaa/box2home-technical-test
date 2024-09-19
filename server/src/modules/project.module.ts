import { Module } from '@nestjs/common'
import { projectProviders } from 'src/providers/projects.providers'
import { ProjectService } from 'src/services/project.servies'
import { DatabaseModule } from './database.module'
import { ProjectController } from 'src/controllers/project.controllers'
import { JwtService } from '@nestjs/jwt'

@Module({
  imports: [DatabaseModule],
  controllers: [ProjectController],
  providers: [...projectProviders, ProjectService, JwtService],
  exports: [],
})
export class ProjectModule {}
