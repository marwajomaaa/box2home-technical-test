import { Inject, Injectable } from '@nestjs/common'
import { Task } from 'src/entities/tasks.entity'
import { CreateTaskDto, UpdateTaskDto } from 'src/validation/tasks.validations'
import { TaskGateway } from 'src/websocket'
import { DeleteResult, Repository } from 'typeorm'

@Injectable()
export class TaskService {
  constructor(
    @Inject('TASK_REPOSITORY')
    private taskRepository: Repository<Task>,
    private taskGateway: TaskGateway,
  ) {}

  create(task: CreateTaskDto): Promise<Task> {
    return this.taskRepository.save(task)
  }

  findAll(): Promise<Task[]> {
    return this.taskRepository.find({ relations: ['project', 'user'] })
  }

  findOne(id: number): Promise<Task> {
    return this.taskRepository.findOne({
      where: { id },
      relations: ['project', 'user'],
    })
  }

  async update(id: number, task: UpdateTaskDto): Promise<Task> {
    await this.taskRepository.update(id, task)
    this.taskGateway.sendTaskStatusUpdate(id, task
      .status)
    return this.findOne(id)
  }

  async updateStatus(id: number, status: string): Promise<Task> {
    await this.taskRepository.update(id, { status })
    const updatedTask = await this.findOne(id)
    this.taskGateway.sendTaskStatusUpdate(id, status)
    return updatedTask
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.taskRepository.delete(id)
  }
}
