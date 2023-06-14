import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { UpdateUserInput } from './dto/update-user.input';
import { SignupInput } from '../auth/dto/inputs/signup.input';

import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  async create({ email, fullName, password }: SignupInput): Promise<User> {
    try {
      const newUser = this.usersRepository.create({
        email,
        fullName,
        password: bcrypt.hashSync(password, 10),
      });
      return await this.usersRepository.save(newUser);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Something wrong');
    }
  }

  async findAll(): Promise<User[]> {
    return [];
  }

  async findOne(id: string): Promise<User> {
    throw new Error('findOne not implemented');
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    throw new Error('update user not implemented');
  }

  async remove(id: string) {
    throw new Error('remove user not implemented');
  }
}
