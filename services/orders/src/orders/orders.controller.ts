import {Controller, Get, Post, Body, Patch, Param, Delete, Headers, HttpException, HttpStatus} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('/api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Headers("Authorization") authHeader: string) {
    if (!authHeader) {
      throw new HttpException("UserId is missing.", HttpStatus.BAD_REQUEST);
    }

    return this.ordersService.create(createOrderDto, authHeader);
  }

  @Get()
  findAll(@Headers("Authorization") authHeader: string) {
    const userId = authHeader.split(' ')[1];
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
