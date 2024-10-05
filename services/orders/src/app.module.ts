import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './jwt/jwt.module';

@Module({
  imports: [OrdersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
