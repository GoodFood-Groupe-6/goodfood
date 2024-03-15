import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  @Post()
  sendHelloMessage(): string {
    this.client.emit('test', 'test 15 mars');
    return 'Message envoyé';
  }

  @Get()
  getHelloMessage(): string {
    return 'Hello from admin service 5!';
  }
}
