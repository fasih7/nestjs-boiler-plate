import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { hashWithBcryptJS } from './utils/helper-methods';
import { UserService } from '../user/user.service';
import { SuccessResponse } from '../global/consts';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async registerUser(user: CreateUserDto) {
    //bcryptjs used for issues with python dependency for bcrypt
    //Ideally bcrypt should be used as it is much faster, replace the method in utils if that is preferred
    user.password = await hashWithBcryptJS(user.password);

    const generatedUser = await this.userService.create(user);
    if (generatedUser) return SuccessResponse;
  }
}
