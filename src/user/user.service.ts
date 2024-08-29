import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { LoggerService } from '../global/logger';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './schemas/user.schema';
import { UserRepo } from './repos/user.repo';

@Injectable()
export class UserService {
  constructor(
    private logger: LoggerService,
    private readonly userRepo: UserRepo,
  ) {}

  async create(user: any) {
    this.logger.silly(UserService.name, this.create.name, 'started');

    try {
      const result = await this.userRepo.create(user);
      return result;
    } catch (error) {
      if (error.code === 11000)
        throw new UnprocessableEntityException(
          'User with this email already exists',
        );
      throw error;
    }
  }

  async findOneByEmail(email: string) {
    this.logger.silly(UserService.name, this.findOneByEmail.name, 'started');

    return await this.userRepo.findOne({ email });
  }

  // findAll() {
  //   return `This action returns all user`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  async update(_id: string | Types.ObjectId, updateUser: Record<string, any>) {
    this.logger.silly(UserService.name, this.update.name, 'started');

    return await this.userRepo.findOneAndUpdate({ _id }, updateUser);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
