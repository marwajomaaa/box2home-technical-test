import { Inject, Injectable } from '@nestjs/common' // Importing NestJS decorators for dependency injection
import { DeleteResult, Repository } from 'typeorm' // TypeORM classes for handling database operations
import { User } from 'src/entities/users.entity' // User entity representing the user table in the database
import { CreateUserDto } from 'src/validation/user.validations' // DTO for creating a new user
import { hashPassword } from 'src/helpers' // Helper function for hashing passwords

@Injectable() // Marks the class as injectable in the NestJS dependency injection system
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>, // Injects the user repository for database operations
  ) {}

  // Finds a user by their email address
  async findOne(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } }) // Searches the user by email
  }

  // Registers a new user by hashing their password and saving the user data
  async register(user: CreateUserDto): Promise<User> {
    const hashedPassword = await hashPassword(user.password) // Hashes the user's password
    user.password = hashedPassword // Assigns the hashed password to the user object
    const newUser = this.userRepository.save(user) // Saves the new user to the database
    return newUser // Returns the newly created user
  }

  // Retrieves all users from the database
  async findAll(): Promise<User[]> {
    return this.userRepository.find() // Returns all users in the database
  }

  // Finds a user by their ID
  async findById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } }) // Searches the user by ID
  }

  // Updates a user's information in the database
  async update(user: User): Promise<User> {
    return this.userRepository.save(user) // Saves the updated user data
  }

  // Deletes a user by their ID and returns the result of the delete operation
  async delete(id: number): Promise<DeleteResult> {
    return this.userRepository.delete({ id }) // Deletes the user with the specified ID
  }
}
