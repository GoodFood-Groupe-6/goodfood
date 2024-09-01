import { Body, Controller, Post } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { LoginService } from './login.service';

@Controller('/api/login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  create(@Body() createLoginDto: CreateLoginDto) {
    return this.loginService.create(createLoginDto);
  }
}
