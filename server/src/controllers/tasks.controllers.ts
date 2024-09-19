import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Roles, RolesGuard, RouteGuard } from 'src/auth/jwt-auth.guard'
import { TaskService } from 'src/services/tasks.services'
import {
  CreateTaskDto,
  UpdateTaskDto,
  UpdateTaskStatusDto,
} from 'src/validation/tasks.validations'

@ApiTags('tasks')
@Controller('tasks')
@UseGuards(RouteGuard, RolesGuard)
@ApiBearerAuth()
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  @Roles(['admin'])
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto)
  }

  @Get()
  @Roles(['admin'])
  findAll() {
    return this.taskService.findAll()
  }

  @Get(':id')
  @Roles(['admin'])
  findOne(@Param('id') id: number) {
    return this.taskService.findOne(id)
  }

  @Put(':id')
  @Roles(['admin'])
  update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto)
  }

  @Delete(':id')
  @Roles(['admin'])
  delete(@Param('id') id: number) {
    return this.taskService.delete(id)
  }

  @Patch('status/:id')
  @Roles(['admin'])
  updateStatus(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskStatusDto,
  ) {
    return this.taskService.updateStatus(id, updateTaskDto.status)
  }
}
