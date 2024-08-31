import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyUserDto } from './dto/verify.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './gaurds/auth.gaurd';
import { ChangePassDto } from './dto/change-pass.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';

//TODO: forgot and change password
//TODO: Role based
//TODO: limit
//TODO: further security enhancements

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async registerUser(@Body() user: CreateUserDto) {
    return this.authService.registerUser(user);
  }

  @Post('verify')
  verifyUserEmail(@Body() verifyBody: VerifyUserDto) {
    return this.authService.verifyUserEmail(verifyBody);
  }

  @Post('resend-token')
  resendVerificationToken(@Body('email') email: string) {
    return this.authService.resendVerificationToken(email);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  loginUser(@Body() loginDto: LoginDto) {
    return this.authService.loginUser(loginDto);
  }

  @ApiHeader({
    name: 'bearer',
    description: 'Custom header',
  })
  @UseGuards(JwtAuthGuard)
  @Post('test')
  test(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  changePassword(@Body() changePassDto: ChangePassDto, @Request() req) {
    const email = req.user.email;
    return this.authService.changePassword(email, changePassDto);
  }
}
