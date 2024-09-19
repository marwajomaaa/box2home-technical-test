import { Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { User } from 'src/entities/users.entity'

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email } })

    if (user && (await bcrypt.compare(pass, '' + user.password))) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.id,
      email: user.email,
      role: user.role,
    }
    return {
      access_token: this.jwtService.sign(payload, {
        privateKey: process.env.JWT_PRIVATE_KEY,
        expiresIn: '1d',
      }),
    }
  }
}
