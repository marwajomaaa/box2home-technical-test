import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator'
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}
export class CreateUserDto {
  @IsString()
  username: string

  @IsEmail()
  email: string

  @ApiProperty({
    enum: UserRole,
    example: UserRole.ADMIN,
    default: UserRole.USER,
  })
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole

  @IsNotEmpty()
  password: string
}

export class LoginUserDto {
  @IsEmail()
  email: string

  @IsNotEmpty()
  password: string
}
