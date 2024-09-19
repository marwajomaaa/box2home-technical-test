import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Roles, RolesGuard, RouteGuard } from 'src/auth/jwt-auth.guard'
import { Project } from 'src/entities/projects.entity'
import { ProjectService } from 'src/services/project.servies'

@ApiTags('projects')
@Controller('projects')
@UseGuards(RouteGuard, RolesGuard)
@ApiBearerAuth()
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post()
  create(@Body() project: Project) {
    return this.projectService.create(project)
  }

  @Get()
  @Roles(['admin'])
  findAll() {
    return this.projectService.findAll()
  }

  @Get(':id')
  @Roles(['admin'])
  findOne(@Param('id') id: number) {
    return this.projectService.findOne(id)
  }
  @Put(':id')
  @Roles(['admin'])
  update(@Param('id') id: number, @Body() project: Project) {
    return this.projectService.update(id, project)
  }

  @Delete(':id')
  @Roles(['admin'])
  delete(@Param('id') id: number) {
    return this.projectService.delete(id)
  }
}
