import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { UpdateUserInput } from './dto/update-user.input';
import { SignupInput } from '../auth/dto/inputs/signup.input';

import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private logger = new Logger('UsersService');

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
      this.handleDBErrors(error);
    }
  }

  async findAll(): Promise<User[]> {
    return [];
  }

  async findOne(id: string): Promise<User> {
    throw new Error('findOne not implemented');
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.usersRepository.findOneByOrFail({ email });
    } catch (error) {
      this.handleDBErrors({
        code: 'error-001',
        detail: `${email} not found`,
      });
    }
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    throw new Error('update user not implemented');
  }

  async remove(id: string) {
    throw new Error('remove user not implemented');
  }

  private handleDBErrors(error: any): never {
    switch (error.code) {
      case '23505':
        throw new BadRequestException(error.detail.replace('Key ', ''));
      case 'error-001':
        throw new BadRequestException(error.detail.replace('Key ', ''));
      case 'error-002':
        throw new NotFoundException(error.detail.replace('Key ', ''));
      default:
        this.logger.error(error);
        throw new InternalServerErrorException('Please check server logs');
    }
  }
}
