import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthResponse } from './types/auth-response.type';
import { SignupInput } from './dto/inputs/signup.input';
import { UsersService } from '../users/users.service';
import { LoginInput } from './dto/inputs';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signup(signupInput: SignupInput): Promise<AuthResponse> {
    const user = await this.usersService.create(signupInput);

    //TODO : Add token with jwt
    const token = 'ABC123';

    return { user, token };
  }

  async login({ email, password }: LoginInput): Promise<AuthResponse> {
    const user = await this.usersService.findOneByEmail(email);
    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestException('Email or password incorrect');
    }

    return {
      token: 'ABC124',
      user,
    };
  }
}
