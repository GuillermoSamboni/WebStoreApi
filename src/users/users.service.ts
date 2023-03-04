import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DataUsersResponseDto } from './response/DataUsersResponseDto';
import { Users, UsersDocument } from './schema/Users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { StructureResponse } from 'src/utils/StructureResponse';
import { ResponseGlobal } from 'src/utils/ResponseGlobal';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private usersModeule: Model<UsersDocument>) {}

  async create(createUserDto: CreateUserDto) {
    return await this.usersModeule.create(createUserDto);
  }

  async findAll(): Promise<StructureResponse<DataUsersResponseDto>> {
    const response = new StructureResponse<DataUsersResponseDto>();
    const users = await this.usersModeule.find();

    if (users.length <= 0) {
      response.code = ResponseGlobal.codeSuccesNotFound
      response.message = ResponseGlobal.messageSuccesNotFound;
      response.count = 0
      response.data = []
    } else {
      response.code = ResponseGlobal.codeSucces;
      response.message = ResponseGlobal.messageSucces;
      response.count = users.length;
      response.data = users.map(user => {
        const userDto = new DataUsersResponseDto()
        userDto.name = user.name;
        userDto.age = user.age;
        userDto.identification = user.identification;
        userDto.email = user.email;
        userDto.phone = user.phone;
        userDto.direction = user.direction;
        userDto.user = user.user;
        userDto.password = user.password;
        userDto.codeVerification = user.codeVerification;
        userDto.sexualGender = user.sexualGender;
        userDto.isActive = user.isActive;
        return userDto;
      })
    }
    return response;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
