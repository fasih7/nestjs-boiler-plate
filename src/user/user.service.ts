import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoggerService } from '../global/logger';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { generateRandomToken } from '../auth/utils/helper-methods';

@Injectable()
export class UserService {
  constructor(
    private logger: LoggerService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    this.logger.silly(UserService.name, this.create.name, 'started');

    //TODO: Implement optional token verification and email verification
    //TODO: Implementation for SSO
    const tokenValue = generateRandomToken(6);
    const expiration = new Date(Date.now() + 60 * 1000);

    const user = { ...createUserDto, token: { value: tokenValue, expiration } };
    const result = await this.userModel.create(user);

    //Implementing send email with token

    return result;
  }

  findAll() {
    return `This action returns all user`;
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
