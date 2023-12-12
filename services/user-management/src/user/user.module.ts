import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

const rmqUrl = {
  protocol: 'amqp',
  hostname: 'localhost',
  port: 5672,
  username: 'user',
  password: 'password',
  locale: 'en_US',
  frameMax: 0,
  heartbeat: 0,
  vhost: '/',
};

@Module({
  controllers: [UserController],
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [rmqUrl],
          queue: 'cats_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
})
export class UserModule {}
