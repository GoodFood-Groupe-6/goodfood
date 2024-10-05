import {HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import prisma from "../../prisma/prisma"
import {Order} from "./entities/order.entity";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class OrdersService {

  constructor(private readonly jwtService: JwtService) {}

  getUserId(header: string) {
    const token: string = header.split(' ')[1];

    const decode = this.jwtService.decode(token)

    console.log(decode);
  }

  create(createOrderDto: CreateOrderDto, header: string) {
    try{
      this.getUserId(header)

      const newOrder: any = prisma.orders.create({
        data: {
          products: JSON.stringify(createOrderDto.orders),
          total_amount: "0",
          address: createOrderDto.address,
          user_id: "1234567890",
        }
      });

      return newOrder;
    }catch(error){
      throw new HttpException('Internal Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      let orders = await prisma.orders.findMany({
        select: {
          user_id: false,
          products: true,
          total_amount: true,
          address: true,
        }
      });

      for (let i = 0; i < orders.length; i++) {
        orders[i].products = JSON.parse(orders[i].products as string);
      }

      return orders;
    }catch(error){
      throw new HttpException('Orders not found', HttpStatus.NOT_FOUND);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
