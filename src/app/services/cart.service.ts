import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items: CartItem[] = [];

  constructor() {}

  addProduct(product: Product): void {
    const cartItem = this.items.find((item) => item.product.id === product.id);
    if (cartItem) {
      cartItem.count++;
    } else {
      this.items.push({ count: 1, product });
    }
  }

  removeProduct(id: number): void {
    this.items = this.items.filter((item) => item.product.id !== id);
  }

  cleanCart(): void {
    this.items = [];
  }

  getCart(): CartItem[] {
    return [...this.items];
  }

  getCount(): number {
    return this.items.reduce((sum, item) => sum + item.count, 0);
  }

  getTotalDiscount(): number {
    return this.items.reduce(
      (sum, item) =>
        sum + item.product.discount * item.product.price * item.count,
      0
    );
  }

  getTotalCost(): number {
    return (
      this.items.reduce(
        (sum, item) => sum + item.product.price * item.count,
        0
      ) - this.getTotalDiscount()
    );
  }
}
