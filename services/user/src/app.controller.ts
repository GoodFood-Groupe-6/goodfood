import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor() {}

  @EventPattern('test')
  async hello(@Payload() data: string, @Ctx() context: RmqContext) {
    console.log(data);
  }
}
