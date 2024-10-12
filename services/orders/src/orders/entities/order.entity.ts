import { UUID } from 'node:crypto';

export class Order {
  private _productId: UUID;
  private _price: number;
  private _quantity: number;

  constructor(productId: UUID, price: number, quantity: number) {
    this._productId = productId;
    this._price = price;
    this._quantity = quantity;
  }

  get productId(): string {
    return this._productId;
  }

  set productId(value: UUID) {
    this._productId = value;
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }

  get quantity(): number {
    return this._quantity;
  }

  set quantity(value: number) {
    this._quantity = value;
  }
}
