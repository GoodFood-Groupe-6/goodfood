import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('/api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(
    @Body() createOrderDto: CreateOrderDto,
    @Headers('Authorization') authHeader: string,
  ) {
    if (!authHeader) {
      throw new HttpException(
        'Authorization header is missing.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.ordersService.create(createOrderDto, authHeader);
  }

  @Get()
  findAll(@Query('userId') userId: string, @Query('orderId') orderId: string) {
    if (userId) {
      return this.ordersService.getOrdersByUser(userId);
    }
    if (orderId) {
      return this.ordersService.findOne(orderId);
    }
    return this.ordersService.findAll();
  }
}
