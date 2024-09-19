import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { RouteGuard } from 'src/auth/jwt-auth.guard'
import { User } from 'src/entities/users.entity'
import { AuthService } from 'src/services/auth.services'
import { UserService } from 'src/services/users.services'
import { CreateUserDto, LoginUserDto } from 'src/validation/user.validations'
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('/')
  async create(@Body() user: CreateUserDto) {
    return this.userService.register(user)
  }

  @Post('/login')
  async login(@Body() user: LoginUserDto) {
    if (user.email && user.password) {
      const exist = await this.authService.validateUser(
        user.email,
        user.password,
      )
      if (!exist) {
        throw new BadRequestException('wrong email or password')
      }
      const token = await this.authService.login(exist)
      return token
    }
  }
  @Get('/profile')
  @ApiBearerAuth()
  @UseGuards(RouteGuard)
  getProfile(@Request() req) {
    return req.user
  }

  @Post('/delete/:id')
  @ApiBearerAuth()
  @UseGuards(RouteGuard)
  async delete(@Body() userId: number) {
    return this.userService.delete(userId)
  }
  @Post('/update/:id')
  @ApiBearerAuth()
  @UseGuards(RouteGuard)
  async update(@Body() user: User) {
    return this.userService.update(user)
  }
  @Post('/findAll')
  @ApiBearerAuth()
  @UseGuards(RouteGuard)
  async findAll() {
    return this.userService.findAll()
  }
  @Post('/findById')
  @ApiBearerAuth()
  @UseGuards(RouteGuard)
  async findById(@Body() user: User) {}

  @Post('/findOne')
  @ApiBearerAuth()
  @UseGuards(RouteGuard)
  async findOne(@Body() user: User) {}
}
