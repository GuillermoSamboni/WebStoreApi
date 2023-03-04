import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { DataUsersResponseDto } from 'src/users/response/DataUsersResponseDto';
import { StructureResponse } from 'src/utils/StructureResponse';
import { loginAuthDto } from './dto/login-auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/registerr')
  registerUser(@Body() registerUser: RegisterAuthDto) {
    return this.authService.register(registerUser)
  }

  @Post('/login')
  async loginUser(@Body() userLogin: loginAuthDto):Promise<StructureResponse<DataUsersResponseDto>> {
    return await this.authService.Login(userLogin)
  }
}
