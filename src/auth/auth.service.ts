import { HttpException, Injectable } from '@nestjs/common';
import { loginAuthDto } from './dto/login-auth.dto';
import { StructureResponse } from 'src/utils/StructureResponse';
import { DataUsersResponseDto } from 'src/users/response/DataUsersResponseDto';
import { ResponseGlobal } from 'src/utils/ResponseGlobal';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from 'src/users/schema/Users.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@InjectModel(Users.name) private authModel: Model<UsersDocument>,
    private jwtService: JwtService) { }

  async register(registerAuthDto: RegisterAuthDto) {
    const { password } = registerAuthDto;
    const plainToHash = await hash(password, 10)
    registerAuthDto = { ...registerAuthDto, password: plainToHash }
    return this.authModel.create(registerAuthDto)
    
  }

  async Login(userLogin: loginAuthDto): Promise<StructureResponse<DataUsersResponseDto>> {
    const { email, password } = userLogin
    const findUser = await this.authModel.findOne({ email })
    if (!findUser) throw new HttpException("User no exist", 404)
    // const checkPassword = await compare(password, findUser.password)
    // if (!checkPassword) throw new HttpException("Password invalid", 403)

    const payload = {
      id: findUser.id,
      name: findUser.name
    }

    const token = await this.jwtService.sign(payload)

    const data = {
      user: findUser,
      token: token
    }

    const responseOne = new StructureResponse<DataUsersResponseDto>()
    responseOne.code = ResponseGlobal.codeSucces;
    responseOne.message = ResponseGlobal.messageSucces;
    responseOne.count = 1;
    responseOne.data = findUser
    const response = { ...responseOne, token: token }    

    return response;
  }
}
function compare(password: loginAuthDto, password1: any) {
  throw new Error('Function not implemented.');
}

