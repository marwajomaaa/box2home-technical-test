import {
  CanActivate,                // Interface for guards in NestJS
  ExecutionContext,           // Context for the current execution
  Injectable,                 // Marks the class as injectable
  UnauthorizedException,      // Exception thrown when a user is unauthorized
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt' // Service for handling JSON Web Tokens
import { Request } from 'express' // Express Request type
import { Reflector } from '@nestjs/core' // Reflector for accessing metadata

@Injectable() // Marks the class as injectable in the NestJS context
export class RouteGuard implements CanActivate {
  constructor(private jwtService: JwtService) {} // Injects the JWT service

  // Method to determine if a request can be activated
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() // Gets the HTTP request object
    const token = this.extractTokenFromHeader(request) // Extracts the token from the request header
    if (!token) {
      throw new UnauthorizedException() // Throws an exception if no token is found
    }
    try {
      // Verifies the token and retrieves the payload
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_PRIVATE_KEY, // Uses the private key for verification
      })
      // Assigns the payload to the request object for access in route handlers
      request['user'] = payload 
    } catch {
      throw new UnauthorizedException() // Throws an exception if token verification fails
    }
    return true // Allows the request to proceed
  }

  // Helper method to extract the token from the authorization header
  private extractTokenFromHeader(request: Request): string | undefined {
    // Splits the authorization header to get the token
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined // Returns the token if it's a Bearer token
  }
}

@Injectable() // Marks the class as injectable in the NestJS context
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {} // Injects the Reflector for accessing route metadata

  // Method to check if the user has the required roles
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler()) // Retrieves roles from the metadata
    if (!roles) {
      return true // If no roles are defined, allow access
    }
    const request = context.switchToHttp().getRequest() // Gets the HTTP request object
    const user = request.user // Retrieves the user from the request
    // Function to check if the user's roles match the required roles
    const matchRoles = (roles: string[], userRoles: string[]) => {
      let check = false
      roles.forEach((element) => {
        if (userRoles.includes(element)) {
          check = true
        }
      })
      return check // Returns true if any required role matches the user's roles
    }
    console.log(user) // Logs the user object for debugging
    return matchRoles(roles, user.role) // Checks if the user's roles match the required roles
  }
}

// Decorator to define roles for route handlers
export const Roles = Reflector.createDecorator<string[]>()
