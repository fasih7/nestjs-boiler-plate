import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Token } from '../utils/constants';
import { Status } from '../utils/enums';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  token: Token;

  @Prop({ type: String, enum: Status, default: Status.pending })
  status: Status;
}

export const UserSchema = SchemaFactory.createForClass(User);
