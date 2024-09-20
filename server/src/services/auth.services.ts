import { Inject, Injectable } from '@nestjs/common' // Injectable and Inject decorators for dependency injection
import { Repository } from 'typeorm' // Repository from TypeORM to handle database operations
import { JwtService } from '@nestjs/jwt' // JWT Service for handling JSON Web Tokens
import * as bcrypt from 'bcrypt' // Library for hashing and comparing passwords
import { User } from 'src/entities/users.entity' // User entity representing the user table in the database

@Injectable() // Marks the class as injectable and available in the NestJS dependency injection system
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>, // Injects the user repository for database operations
    private jwtService: JwtService, // Injects the JWT service for generating tokens
  ) {}

  // Method to validate user credentials
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email } }) // Finds the user by email

    // Checks if the user exists and the password matches
    if (user && (await bcrypt.compare(pass, '' + user.password))) {
      const { password, ...result } = user // Excludes the password from the returned user data
      return result // Returns the user data without the password
    }
    return null // Returns null if validation fails
  }

  // Method to log in a user and generate a JWT token
  async login(user: any) {
    // Creates the payload for the JWT token containing user details
    const payload = {
      username: user.username, // Username of the user
      sub: user.id,            // User ID
      email: user.email,       // User's email address
      role: user.role,         // User's role (e.g., admin, user)
    }
    return {
      access_token: this.jwtService.sign(payload, { // Signs the payload to create a JWT token
        privateKey: process.env.JWT_PRIVATE_KEY, // Uses the private key from environment variables
        expiresIn: '1d', // Token expiration time (1 day)
      }),
    }
  }
}
