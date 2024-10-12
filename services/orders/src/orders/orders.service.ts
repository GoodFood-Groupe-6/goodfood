import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import prisma from '../../prisma/prisma';
import { JwtService } from '@nestjs/jwt';
import { UUID } from 'node:crypto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(private readonly jwtService: JwtService) {}

  getUserId(header: string) {
    const token: string = header.split(' ')[1];

    const { id } = this.jwtService.decode(token);

    return id;
  }

  formatProductListing(orders: Array<any>) {
    for (const order of orders) {
      order.products = JSON.parse(order.products as string);
    }
  }

  create(createOrderDto: CreateOrderDto, header: string) {
    try {
      const newOrder: any = prisma.orders.create({
        data: {
          products: JSON.stringify(createOrderDto.orders),
          total_amount: '0',
          address: createOrderDto.address,
          user_id: this.getUserId(header),
        },
      });

      return newOrder;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      const orders = await prisma.orders.findMany({
        select: {
          user_id: false,
          products: true,
          total_amount: true,
          address: true,
        },
      });

      this.formatProductListing(orders);

      return orders;
    } catch (error) {
      throw new HttpException('Orders not found', HttpStatus.NOT_FOUND);
    }
  }

  async getOrdersByUser(userId: string) {
    try {
      const orders = await prisma.orders.findMany({
        where: {
          user_id: userId,
        },
      });

      this.formatProductListing(orders);

      return orders;
    } catch (error) {
      throw new HttpException(
        'No orders found for this user.',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOne(id: string) {
    try {
      const order = await prisma.orders.findMany({
        where: {
          id: id,
        },
      });

      this.formatProductListing(order);

      return order;
    } catch (error) {}
  }
}
