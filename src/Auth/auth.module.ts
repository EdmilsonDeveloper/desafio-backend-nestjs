import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { User } from './model/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthService } from './authentication/auth.service';
import { AuthController } from './authentication/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Session } from './model/session.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Session]), 
  JwtModule.registerAsync({
    global: true,
    imports: [],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: {
        expiresIn: +configService.get<number>('JWT_EXPIRATION_TIME'),
      },
    }),
    inject: [ConfigService],
  })
],
  controllers: [UserController, AuthController],
  providers: [UserService, AuthService],
})
export class AuthModule {}
