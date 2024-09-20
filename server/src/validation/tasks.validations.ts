import {
  IsString,     // Validator to ensure the value is a string
  IsNotEmpty,   // Validator to ensure the field is not empty
  IsDate,       // Validator to ensure the value is a valid date
  IsEnum,       // Validator to ensure the value matches one of the enum options
  IsOptional,   // Validator to mark a field as optional
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger' // Decorator to add metadata for Swagger documentation
import { Transform } from 'class-transformer' // Used to transform data types during class transformation

// Enum for Task Status representing the various states a task can be in
export enum TaskStatus {
  PENDING = 'pending',           // Task is pending
  IN_PROGRESS = 'in-progress',   // Task is currently in progress
  COMPLETED = 'completed',       // Task is completed
}

// DTO (Data Transfer Object) for creating a task
export class CreateTaskDto {
  @ApiProperty({ example: 'Task Title' }) // Swagger property for title with an example
  @IsString()     // Ensures the title is a string
  @IsNotEmpty()   // Ensures the title is not empty
  title: string   // Title of the task

  @ApiProperty({ example: 'Task Description' }) // Swagger property for description with an example
  @IsString()     // Ensures the description is a string
  @IsNotEmpty()   // Ensures the description is not empty
  description: string // Description of the task

  @ApiProperty({ enum: TaskStatus, example: TaskStatus.PENDING }) // Swagger property for status with enum values and an example
  @IsEnum(TaskStatus) // Ensures the status matches one of the TaskStatus enum values
  @IsNotEmpty()       // Ensures the status is not empty
  status: TaskStatus  // Status of the task (pending, in-progress, or completed)

  @ApiProperty({ example: '2024-09-30T12:00:00.000Z' }) // Swagger property for due date with an example
  @Transform(({ value }) => new Date(value), { toClassOnly: true }) // Transforms the input into a Date object
  @IsDate()     // Ensures the value is a valid date
  @IsNotEmpty() // Ensures the due date is not empty
  dueDate: Date // Due date of the task
}

// DTO for updating a task
export class UpdateTaskDto {
  @ApiProperty({ example: 'Updated Task Title', required: false }) // Swagger property for optional title update
  @IsString()   // Ensures the title is a string
  @IsOptional() // Marks the title field as optional
  title?: string // Optional updated title of the task

  @ApiProperty({ example: 'Updated Task Description', required: false }) // Swagger property for optional description update
  @IsString()   // Ensures the description is a string
  @IsOptional() // Marks the description field as optional
  description?: string // Optional updated description of the task

  @ApiProperty({
    enum: TaskStatus, // Swagger property for status with enum values
    example: TaskStatus.IN_PROGRESS, // Example value for updating the status
    required: false, // Field is optional
  })
  @IsEnum(TaskStatus) // Ensures the status matches one of the TaskStatus enum values
  @IsOptional()       // Marks the status field as optional
  status?: TaskStatus // Optional updated status of the task

  @ApiProperty({ example: '2024-09-30T12:00:00.000Z', required: false }) // Swagger property for optional due date update
  @IsDate()     // Ensures the value is a valid date
  @Transform(({ value }) => new Date(value), { toClassOnly: true }) // Transforms the input into a Date object
  @IsOptional() // Marks the due date field as optional
  dueDate?: Date // Optional updated due date of the task
}

// DTO for updating only the task status
export class UpdateTaskStatusDto {
  @ApiProperty({
    enum: TaskStatus, // Swagger property for status with enum values
    example: TaskStatus.IN_PROGRESS, // Example value for status update
    required: false, // Field is optional
  })
  @IsEnum(TaskStatus) // Ensures the status matches one of the TaskStatus enum values
  @IsOptional()       // Marks the status field as optional
  status?: TaskStatus // Optional status update for the task
}
