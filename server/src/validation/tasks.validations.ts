import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsEnum,
  IsOptional,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'

// Enum for Task Status
export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
}

// Create Task DTO
export class CreateTaskDto {
  @ApiProperty({ example: 'Task Title' })
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiProperty({ example: 'Task Description' })
  @IsString()
  @IsNotEmpty()
  description: string

  @ApiProperty({ enum: TaskStatus, example: TaskStatus.PENDING })
  @IsEnum(TaskStatus)
  @IsNotEmpty()
  status: TaskStatus

  @ApiProperty({ example: '2024-09-30T12:00:00.000Z' })
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsDate()
  @IsNotEmpty()
  dueDate: Date
}

// Update Task DTO
export class UpdateTaskDto {
  @ApiProperty({ example: 'Updated Task Title', required: false })
  @IsString()
  @IsOptional()
  title?: string

  @ApiProperty({ example: 'Updated Task Description', required: false })
  @IsString()
  @IsOptional()
  description?: string

  @ApiProperty({
    enum: TaskStatus,
    example: TaskStatus.IN_PROGRESS,
    required: false,
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus

  @ApiProperty({ example: '2024-09-30T12:00:00.000Z', required: false })
  @IsDate()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsOptional()
  dueDate?: Date
}
export class UpdateTaskStatusDto {
  @ApiProperty({
    enum: TaskStatus,
    example: TaskStatus.IN_PROGRESS,
    required: false,
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus
}
