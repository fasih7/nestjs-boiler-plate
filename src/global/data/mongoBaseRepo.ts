import { UnprocessableEntityException } from '@nestjs/common';
import { Model, Types } from 'mongoose';

export class MongoBaseRepo {
  constructor(private model: Model<any>) {}

  //TODO: furnish for create many
  async create(data: any) {
    try {
      const result = await this.model.create(data);
      return result;
    } catch (error) {
      if (error.code === 11000)
        throw new UnprocessableEntityException(
          'User with this email already exists',
        );
      throw error;
    }
  }

  async findOne(data: Record<string, any>) {
    return await this.model.findOne(data);
  }

  async findOneById(_id: string | Types.ObjectId) {
    return await this.model.findById(_id);
  }

  //TODO: furnish
  async findMany(data: any) {
    return await this.model.find(data);
  }

  async findOneAndUpdate(searchObject: Record<string, any>, updateData: any) {
    return await this.model.findOneAndUpdate(searchObject, updateData);
  }

  async updateMany(searchObject: Record<string, any>) {
    return await this.model.updateMany(searchObject);
  }

  async findOneAndDelete(searchObject: Record<string, any>) {
    return await this.model.findOneAndDelete(searchObject);
  }

  async DeleteMany(searchObject: Record<string, any>) {
    return await this.model.deleteMany(searchObject);
  }
}
