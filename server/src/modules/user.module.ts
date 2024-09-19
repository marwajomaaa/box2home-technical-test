import { Module } from '@nestjs/common'
import { UserController } from 'src/controllers/users.controllers'
import { userProviders } from 'src/providers/users.providers'
import { UserService } from 'src/services/users.services'
import { DatabaseModule } from './database.module'
import { AuthService } from 'src/services/auth.services'
import { JwtService } from '@nestjs/jwt'

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [...userProviders, UserService, AuthService, JwtService],
  exports: [],
})
export class UsersModule {}
