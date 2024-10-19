import { Injectable } from '@nestjs/common';
import { CreateRegisterDto } from './dto/create-register.dto';
import prisma from '../../prisma/prisma';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterService {
  async create(createRegisterDto: CreateRegisterDto) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(createRegisterDto.password, saltOrRounds);

    return prisma.user.create({
      data: {
        email: createRegisterDto.email,
        firstname: createRegisterDto.firstname,
        lastname: createRegisterDto.lastname.toUpperCase(),
        username: createRegisterDto.username,
        password: hash,
        role: createRegisterDto.role,
      },
    });
  }
}
