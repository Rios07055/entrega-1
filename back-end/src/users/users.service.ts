import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwt: JwtService,
  ) {}

  async get() {
    return await this.userRepository.find();
  }

  async create(createUserDto: CreateUserDto) {
    try {
      createUserDto.password = bcryptjs.hashSync(createUserDto.password, 10);
      const { user_id, username, email } =
        await this.userRepository.save(createUserDto);

      return {
        user_id,
        username,
        token: this.getToken(user_id),
      };
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException(`${createUserDto.username} ya existe!!`);
      }
      throw new InternalServerErrorException('Algo salió mal!!', error.message);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  async login(loginUserDto: LoginDto) {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findOneBy({ email });
    if (!user || this.isNotValid(password, user.password)) {
      throw new UnauthorizedException('Not valid credentials');
    }
    return {
      ...user,
      token: this.getToken(user.user_id),
    };
  }

  isNotValid(password: string, encripted: string) {
    return !bcryptjs.compareSync(password, encripted);
  }

  getToken(user_id: number): string {
    return this.jwt.sign(
      {
        user_id,
      },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRATION,
      },
    );
  }

  validate(token: string) {
    try {
      const { user_id } = this.jwt.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      return this.userRepository.findOne({
        where: {
          user_id,
        },
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid token', error.message);
    }
  }
}
