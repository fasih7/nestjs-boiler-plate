import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoggerService } from '../global/logger';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './schemas/user.schema';
import { generateRandomToken } from '../auth/utils/helper-methods';

@Injectable()
export class UserService {
  constructor(
    private logger: LoggerService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(user: any) {
    this.logger.silly(UserService.name, this.create.name, 'started');

    const result = await this.userModel.create(user);

    return result;
  }

  async findOneByEmail(email: string) {
    this.logger.silly(UserService.name, this.findOneByEmail.name, 'started');

    return await this.userModel.findOne({ email });
  }

  // findAll() {
  //   return `This action returns all user`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  async update(id: string | Types.ObjectId, updateUser: Record<string, any>) {
    this.logger.silly(UserService.name, this.update.name, 'started');

    return await this.userModel.findByIdAndUpdate(id, updateUser);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
