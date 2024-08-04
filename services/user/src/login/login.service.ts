import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import prisma from '../../prisma/prisma';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(private jwtService: JwtService) {}

  async create(createLoginDto: CreateLoginDto) {
    console.log(createLoginDto);
    const user: Partial<User> = await prisma.user.findUniqueOrThrow({
      where: {
        username: createLoginDto.username,
      },
      select: {
        id: true,
        password: true,
        role: true,
      },
    });

    if (!bcrypt.compare(createLoginDto.password, user.password)) {
      throw new UnauthorizedException('Mot de passe incorrect.');
    }

    const payload = { id: user.id, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
