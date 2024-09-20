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
} from '@nestjs/common' // Import necessary decorators and types from NestJS
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger' // Swagger decorators for API documentation
import { Roles, RolesGuard, RouteGuard } from 'src/auth/jwt-auth.guard' // Guards for authentication and authorization
import { TaskService } from 'src/services/tasks.services' // Service for task operations
import {
  CreateTaskDto,
  UpdateTaskDto,
  UpdateTaskStatusDto,
} from 'src/validation/tasks.validations' // Data transfer objects for validation

@ApiTags('tasks') // Tags the controller for Swagger documentation
@Controller('tasks') // Defines the base route for this controller
@UseGuards(RouteGuard, RolesGuard) // Applies guards for authentication and role-based access
@ApiBearerAuth() // Indicates that the endpoints require a bearer token
export class TaskController {
  constructor(private taskService: TaskService) {} // Injects the TaskService

  // Endpoint to create a new task
  @Post()
  @Roles(['admin']) // Restricts access to admin users
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto) // Calls the service to create a task
  }

  // Endpoint to retrieve all tasks
  @Get()
  @Roles(['admin']) // Restricts access to admin users
  findAll() {
    return this.taskService.findAll() // Calls the service to fetch all tasks
  }

  // Endpoint to retrieve a task by ID
  @Get(':id')
  @Roles(['admin']) // Restricts access to admin users
  findOne(@Param('id') id: number) {
    return this.taskService.findOne(id) // Calls the service to find a task by ID
  }

  // Endpoint to update a task by ID
  @Put(':id')
  @Roles(['admin']) // Restricts access to admin users
  update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto) // Calls the service to update a task
  }

  // Endpoint to delete a task by ID
  @Delete(':id')
  @Roles(['admin']) // Restricts access to admin users
  delete(@Param('id') id: number) {
    return this.taskService.delete(id) // Calls the service to delete a task
  }

  // Endpoint to update the status of a task
  @Patch('status/:id')
  @Roles(['admin']) // Restricts access to admin users
  updateStatus(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskStatusDto,
  ) {
    return this.taskService.updateStatus(id, updateTaskDto.status) // Calls the service to update the task's status
  }
}
