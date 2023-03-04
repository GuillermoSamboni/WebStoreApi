import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, Userschema } from 'src/users/schema/Users.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtConstanst } from './JwtConstanst';
import { JwtStrategy } from './JwtStrategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: Userschema
      }
    ]),
    JwtModule.register({
      secret: JwtConstanst.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],  
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
