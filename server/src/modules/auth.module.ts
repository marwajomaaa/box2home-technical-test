import { Module } from '@nestjs/common'
import { userProviders } from 'src/providers/users.providers'
import { DatabaseModule } from './database.module'
import { AuthService } from 'src/services/auth.services'

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [...userProviders, AuthService],
  exports: [],
})
export class AuthModule {}
