import {
  BadRequestException,        // Exception thrown for bad requests
  Body,                       // Decorator for extracting the body of the request
  Controller,                 // Marks the class as a controller in NestJS
  Get,                        // HTTP GET decorator
  Post,                       // HTTP POST decorator
  Request,                    // Type for the request object
  UseGuards,                 // Decorator for applying guards
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger' // Swagger decorators for API documentation
import { RouteGuard } from 'src/auth/jwt-auth.guard' // JWT guard for protecting routes
import { User } from 'src/entities/users.entity' // User entity representing the user table
import { AuthService } from 'src/services/auth.services' // Authentication service
import { UserService } from 'src/services/users.services' // User service for handling user data
import { CreateUserDto, LoginUserDto } from 'src/validation/user.validations' // DTOs for user validation

@ApiTags('users') // Tag for Swagger API documentation
@Controller('users') // Sets the base route for this controller
export class UserController {
  constructor(
    private userService: UserService, // Injects the user service
    private authService: AuthService, // Injects the authentication service
  ) {}

  // Route for creating a new user
  @Post('/')
  async create(@Body() user: CreateUserDto) {
    return this.userService.register(user) // Registers the user and returns the result
  }

  // Route for user login
  @Post('/login')
  async login(@Body() user: LoginUserDto) {
    if (user.email && user.password) {
      // Validates the user's credentials
      const exist = await this.authService.validateUser(
        user.email,
        user.password,
      )
      if (!exist) {
        throw new BadRequestException('wrong email or password') // Throws an exception if credentials are invalid
      }
      const token = await this.authService.login(exist) // Generates a JWT token for the user
      return token // Returns the token
    }
  }

  // Route for retrieving user profile
  @Get('/profile')
  @ApiBearerAuth() // Indicates that this route requires authentication
  @UseGuards(RouteGuard) // Applies the RouteGuard to protect this route
  getProfile(@Request() req) {
    return req.user // Returns the user data from the request
  }

  // Route for deleting a user by ID
  @Post('/delete/:id')
  @ApiBearerAuth() // Requires authentication
  @UseGuards(RouteGuard) // Protects the route
  async delete(@Body() userId: number) {
    return this.userService.delete(userId) // Deletes the user and returns the result
  }

  // Route for updating user information
  @Post('/update/:id')
  @ApiBearerAuth() // Requires authentication
  @UseGuards(RouteGuard) // Protects the route
  async update(@Body() user: User) {
    return this.userService.update(user) // Updates the user and returns the result
  }

  // Route for finding all users
  @Post('/findAll')
  @ApiBearerAuth() // Requires authentication
  @UseGuards(RouteGuard) // Protects the route
  async findAll() {
    return this.userService.findAll() // Retrieves and returns all users
  }

  // Route for finding a user by ID (incomplete implementation)
  @Post('/findById')
  @ApiBearerAuth() // Requires authentication
  @UseGuards(RouteGuard) // Protects the route
  async findById(@Body() user: User) {
    // Implementation needed
  }

  // Route for finding a user by other criteria (incomplete implementation)
  @Post('/findOne')
  @ApiBearerAuth() // Requires authentication
  @UseGuards(RouteGuard) // Protects the route
  async findOne(@Body() user: User) {
    // Implementation needed
  }
}
