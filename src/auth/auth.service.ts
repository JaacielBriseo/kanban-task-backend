import { Injectable } from '@nestjs/common';
import { AuthResponse } from './types/auth-response.type';
import { SignupInput } from './dto/inputs/signup.input';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signup(signupInput: SignupInput): Promise<AuthResponse> {
    const user = await this.usersService.create(signupInput);

    //TODO : Add token with jwt
    const token = 'ABC123';

    return { user, token };
  }

  async login(): Promise<AuthResponse> {
    throw new Error('login not implemented');
  }
}