import { Body, Controller, Get, HttpCode, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  @Post()
  @HttpCode(200)
  sendHelloMessage(@Body('message') message: string) {
    this.client.emit('test', message);
    return { message: 'Message envoyé à RabbitMQ!' };
  }

  @Get()
  getHelloMessage(): string {
    return 'Hello from admin service 5!';
  }
}
