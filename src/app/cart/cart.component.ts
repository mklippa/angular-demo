import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  template: `
    <div class="position-relative">
      <button
        class="btn btn-success position-relative btn-sm"
        (click)="showPreview = !showPreview"
      >
        <span class="bi-cart"></span>
        <span
          class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
        >
          {{ cartService.getCount() }}
          <span class="visually-hidden">unread messages</span>
        </span>
      </button>
      <div
        *ngIf="cartService.getCount() && showPreview"
        class="bg-white p-3 rounded position-absolute shadow-lg mt-2 end-0"
        style="z-index:1;width:700px"
      >
        <ul class="list-group mb-3">
          <li
            *ngFor="let item of cartService.getCart()"
            class="list-group-item d-flex align-items-center"
          >
            <span class="flex-fill"
              >{{ item.product.title }} ({{ item.count }} шт.)</span
            >
            <button
              class="btn btn-light btn-sm float-end"
              (click)="onRemoveProduct(item.product.id)"
            >
              <span class="bi-x-lg"></span>
            </button>
          </li>
        </ul>
        <h5 class="mb-3">
          Итоговая сумма: {{ cartService.getTotalCost() | currency }}
        </h5>
        <h5 class="mb-3">
          Скидка: {{ cartService.getTotalDiscount() | currency }}
        </h5>
        <div class="btn-group">
          <button class="btn btn-success" (click)="onMakeOrder()">
            Оформить заказ
          </button>
          <button class="btn btn-danger" (click)="onCleanCart()">
            Очистить корзину
          </button>
          <button class="btn btn-warning" (click)="showPreview = false">
            Закрыть
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class CartComponent implements OnInit {
  showPreview = false;

  constructor(public cartService: CartService, private router: Router) {}

  ngOnInit(): void {}

  onRemoveProduct(id: number): void {
    this.cartService.removeProduct(id);
    if (!this.cartService.getCount()) this.showPreview = false;
  }

  onCleanCart(): void {
    this.cartService.cleanCart();
    if (!this.cartService.getCount()) this.showPreview = false;
  }

  onMakeOrder(): void {
    this.cartService.cleanCart();
    if (!this.cartService.getCount()) this.showPreview = false;
    this.router.navigate(['order-form']);
  }
}
