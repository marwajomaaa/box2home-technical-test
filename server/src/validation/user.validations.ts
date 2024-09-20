import { ApiProperty } from '@nestjs/swagger' // Decorator to define API properties for Swagger documentation
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator' // Validators to enforce data validation rules

// Enum defining user roles
export enum UserRole {
  ADMIN = 'admin', // Administrator role
  USER = 'user',   // Standard user role
}

// DTO (Data Transfer Object) for creating a user
export class CreateUserDto {
  @IsString() // Ensures the username is a string
  username: string // User's username

  @IsEmail() // Ensures the value is a valid email format
  email: string // User's email address

  @ApiProperty({
    enum: UserRole,           // Specifies the enum values for Swagger documentation
    example: UserRole.ADMIN,  // Example value for Swagger
    default: UserRole.USER,   // Default role value
  })
  @IsEnum(UserRole) // Ensures the role value is one of the UserRole enum values
  @IsNotEmpty()     // Ensures the role field is not empty
  role: UserRole // User's role, either ADMIN or USER

  @IsNotEmpty() // Ensures the password field is not empty
  password: string // User's password
}

// DTO for user login
export class LoginUserDto {
  @IsEmail() // Ensures the value is a valid email format
  email: string // User's email address for login

  @IsNotEmpty() // Ensures the password field is not empty
  password: string // User's password for login
}
