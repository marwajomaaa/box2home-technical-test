import { Inject, Injectable } from '@nestjs/common' // Import necessary decorators and types
import { Task } from 'src/entities/tasks.entity' // Task entity representing the tasks table
import { CreateTaskDto, UpdateTaskDto } from 'src/validation/tasks.validations' // DTOs for task validation
import { TaskGateway } from 'src/websocket' // WebSocket gateway for real-time updates
import { DeleteResult, Repository } from 'typeorm' // TypeORM types for database operations

@Injectable() // Marks the class as a provider that can be injected
export class TaskService {
  constructor(
    @Inject('TASK_REPOSITORY') // Injects the Task repository
    private taskRepository: Repository<Task>,
    private taskGateway: TaskGateway, // Injects the TaskGateway for WebSocket communication
  ) {}

  // Method to create a new task
  create(task: CreateTaskDto): Promise<Task> {
    return this.taskRepository.save(task) // Saves the task to the database
  }

  // Method to retrieve all tasks
  findAll(): Promise<Task[]> {
    return this.taskRepository.find({ relations: ['project', 'user'] }) // Fetches all tasks with related project and user
  }

  // Method to find a task by its ID
  findOne(id: number): Promise<Task> {
    return this.taskRepository.findOne({
      where: { id },
      relations: ['project', 'user'], // Fetches the task with related project and user
    })
  }

  // Method to update a task by its ID
  async update(id: number, task: UpdateTaskDto): Promise<Task> {
    await this.taskRepository.update(id, task) // Updates the task in the database
    this.taskGateway.sendTaskStatusUpdate(id, task.status) // Sends a status update via WebSocket
    return this.findOne(id) // Returns the updated task
  }

  // Method to update the status of a task
  async updateStatus(id: number, status: string): Promise<Task> {
    await this.taskRepository.update(id, { status }) // Updates the task status in the database
    const updatedTask = await this.findOne(id) // Fetches the updated task
    this.taskGateway.sendTaskStatusUpdate(id, status) // Sends a status update via WebSocket
    return updatedTask // Returns the updated task
  }

  // Method to delete a task by its ID
  async delete(id: number): Promise<DeleteResult> {
    return this.taskRepository.delete(id) // Deletes the task from the database
  }
}
