import { IsString, IsNotEmpty } from "class-validator";
import {Order} from "../entities/order.entity";

export class CreateOrderDto {
    @IsNotEmpty()
    orders: Array<Order>;

    @IsString()
    @IsNotEmpty()
    address: string;
}
