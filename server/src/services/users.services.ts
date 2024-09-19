import { Inject, Injectable } from '@nestjs/common'
import { DeleteResult, Repository } from 'typeorm'
import { User } from 'src/entities/users.entity'
import { CreateUserDto } from 'src/validation/user.validations'
import { hashPassword } from 'src/helpers'

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } })
  }

  async register(user: CreateUserDto): Promise<User> {
    const hashedPassword = await hashPassword(user.password)
    user.password = hashedPassword
    const newUser = this.userRepository.save(user)
    return newUser
  }
  async findAll(): Promise<User[]> {
    return this.userRepository.find()
  }
  async findById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } })
  }
  async update(user: User): Promise<User> {
    return this.userRepository.save(user)
  }
  async delete(id: number): Promise<DeleteResult> {
    return this.userRepository.delete({ id })
  }
}
