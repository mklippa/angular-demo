import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-form',
  template: `
    <form class="col-md-3" [formGroup]="orderForm" (ngSubmit)="makeOrder()">
      <div class="mb-3">
        <input
          class="form-control"
          type="text"
          name="name"
          placeholder="Фамилия Имя"
          formControlName="name"
        />
        <div
          *ngIf="name.invalid && (name.dirty || name.touched)"
          class="text-danger"
        >
          Невалидное имя
        </div>
      </div>
      <div class="mb-3">
        <input
          class="form-control"
          type="text"
          name="phone"
          placeholder="Телефон"
          formControlName="phone"
        />
        <div
          *ngIf="phone.invalid && (phone.dirty || phone.touched)"
          class="text-danger"
        >
          Невалидный телефон
        </div>
      </div>
      <div class="mb-3">
        <h5>Способ получения товара</h5>
        <div
          class="form-check"
          *ngFor="let receiving of receivingType | keyvalue"
        >
          <input
            class="form-check-input"
            type="radio"
            name="receiving"
            [id]="receiving.key"
            [value]="receiving.value"
            formControlName="receiving"
          />
          <label class="form-check-label" [for]="receiving.key">
            {{ receiving.value }}
          </label>
        </div>
        <div
          *ngIf="receiving.invalid && (receiving.dirty || receiving.touched)"
          class="text-danger"
        >
          Невалидный способ получения товара
        </div>
      </div>
      <ng-container
        *ngIf="receiving.value === receivingType.Delivery"
        formGroupName="address"
      >
        <h5>Адрес доставки</h5>
        <div class="mb-3">
          <select
            class="form-select"
            name="city"
            placeholder="Город"
            formControlName="city"
          >
            <option *ngFor="let city of cities" [value]="city.code">
              {{ city.name }}
            </option>
          </select>
          <div
            *ngIf="city.invalid && (city.dirty || city.touched)"
            class="text-danger"
          >
            Невалидный город
          </div>
        </div>
        <div class="mb-3">
          <input
            class="form-control"
            type="text"
            name="street"
            placeholder="Улица"
            formControlName="street"
          />
          <div
            *ngIf="street.invalid && (street.dirty || street.touched)"
            class="text-danger"
          >
            Невалидная улица
          </div>
        </div>
        <div class="mb-3">
          <input
            class="form-control"
            type="text"
            name="house"
            placeholder="Дом"
            formControlName="house"
          />
          <div
            *ngIf="house.invalid && (house.dirty || house.touched)"
            class="text-danger"
          >
            Невалидный дом
          </div>
        </div>
        <div class="mb-3">
          <input
            class="form-control"
            type="text"
            name="flat"
            placeholder="Квартира"
            formControlName="flat"
          />
          <div
            *ngIf="flat.invalid && (flat.dirty || flat.touched)"
            class="text-danger"
          >
            Невалидная квартира
          </div>
        </div>
      </ng-container>
      <div class="mb-3">
        <h5>Способ оплаты</h5>
        <ng-container *ngFor="let payment of paymentType | keyvalue">
          <div
            class="form-check"
            *ngIf="
              receiving.value !== receivingType.Delivery ||
              payment.value !== paymentType.Cash
            "
          >
            <input
              class="form-check-input"
              type="radio"
              name="payment"
              [id]="payment.key"
              [value]="payment.value"
              formControlName="payment"
            />
            <label class="form-check-label" [for]="payment.key">
              {{ payment.value }}
            </label>
          </div>
        </ng-container>
        <div
          *ngIf="payment.invalid && (payment.dirty || payment.touched)"
          class="text-danger"
        >
          Невалидный способ оплаты
        </div>
      </div>
      <button class="btn btn-primary" type="submit">Оформить заказ</button>
    </form>
  `,
  styles: [],
})
export class OrderFormComponent implements OnInit, OnDestroy {
  receivingType = ReceivingType;
  paymentType = PaymentType;
  cities = [
    { name: 'Москва', code: 1 },
    { name: 'Санкт-Петербург', code: 2 },
    { name: 'Сочи', code: 3 },
    { name: 'Казань', code: 4 },
  ];
  orderForm = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-zA-Zа-яА-Я]+(?:\\s[a-zA-Zа-яА-Я]+)+$'),
      ],
    ],
    phone: ['', [Validators.required, Validators.pattern('^\\+\\d{11}$')]],
    receiving: [ReceivingType.Delivery, Validators.required],
    address: this.fb.group({
      city: this.cities[0].code,
      street: '',
      house: '',
      flat: '',
    }),
    payment: [PaymentType.Card, Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.receiving.valueChanges.subscribe((value: ReceivingType) => {
      if (
        value === ReceivingType.Delivery &&
        this.payment.value === PaymentType.Cash
      ) {
        this.payment.setValue(PaymentType.Card);
      }

      if (value === ReceivingType.Delivery) {
        Object.keys(this.address.controls).forEach((key) => {
          this.address.controls[key].setValidators([Validators.required]);
          this.address.controls[key].updateValueAndValidity();
        });
      } else {
        Object.keys(this.address.controls).forEach((key) => {
          this.address.controls[key].clearValidators();
          this.address.controls[key].updateValueAndValidity();
        });
      }
    });

    const storageValue = localStorage.getItem('order');
    if (storageValue) this.orderForm.setValue(JSON.parse(storageValue));
  }

  ngOnDestroy(): void {
    localStorage.setItem('order', JSON.stringify(this.orderForm.value));
  }

  makeOrder(): void {
    if (this.orderForm.invalid) {
      this.orderForm.markAllAsTouched();
      return;
    }
    console.log(this.orderForm.value);
    this.orderForm.reset();
  }

  get name() {
    return this.orderForm.get('name')!;
  }

  get phone() {
    return this.orderForm.get('phone')!;
  }

  get receiving() {
    return this.orderForm.get('receiving')!;
  }

  get address() {
    return this.orderForm.get('address')! as FormGroup;
  }

  get city() {
    return this.address?.get('city')!;
  }

  get street() {
    return this.address?.get('street')!;
  }

  get house() {
    return this.address?.get('house')!;
  }

  get flat() {
    return this.address?.get('flat')!;
  }

  get payment() {
    return this.orderForm.get('payment')!;
  }
}

enum ReceivingType {
  Delivery = 'Доставка',
  Pickup = 'Самовывоз',
}

enum PaymentType {
  Cash = 'Наличными при получении',
  Card = 'Картой на сайте',
}
