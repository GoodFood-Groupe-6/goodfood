import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  async getUser() {
    this.client.emit('test-user', 'test');
    console.log(
      'microservice user-management a envoyé un message à microservice admin',
    );
    return 'OK';
  }
}
