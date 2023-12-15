import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';

@Controller('microservice')
export class AppController {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  @MessagePattern('test-user')
  getTest(@Payload() data: string) {
    console.log('microservice admin: ', data);
  }
}
