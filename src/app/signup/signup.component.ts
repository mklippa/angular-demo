import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  template: `
    <form
      class="col-sm-3"
      #signupForm="ngForm"
      (ngSubmit)="signup(signupForm)"
      [ngFormOptions]="{ updateOn: 'blur' }"
    >
      <div class="mb-3">
        <input
          class="form-control"
          type="text"
          placeholder="Фамилия Имя"
          name="name"
          ngModel
          #name="ngModel"
          required
          pattern="^[a-zA-Zа-яА-Я]+(?:\\s[a-zA-Zа-яА-Я]+)+$"
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
          type="email"
          placeholder="Email"
          name="email"
          ngModel
          #email="ngModel"
          email
          required
        />
        <div
          *ngIf="email.invalid && (email.dirty || email.touched)"
          class="text-danger"
        >
          Невалидный email
        </div>
      </div>
      <ng-container
        ngModelGroup="password"
        #passwordGroup="ngModelGroup"
        appPasswordMatch
      >
        <div class="mb-3">
          <input
            class="form-control"
            type="password"
            placeholder="Пароль"
            name="password"
            ngModel
            #password="ngModel"
            pattern="^(?=.*?[A-Z])(?=(.*[a-z])+)(?=(.*\\d)+)(?=(.*\\W)+)(?!.*\\s).{8,}$"
            required
          />
          <div
            *ngIf="password.invalid && (password.dirty || password.touched)"
            class="text-danger"
          >
            Невалидный пароль
          </div>
        </div>
        <div class="mb-3">
          <input
            class="form-control"
            type="password"
            placeholder="Повторить пароль"
            name="confirm"
            ngModel
          />
          <div
            *ngIf="passwordGroup.hasError('passwordMatch')"
            class="text-danger"
          >
            Пароль не совпадает
          </div>
        </div>
      </ng-container>
      <button class="btn btn-primary" type="submit">Отправить</button>
    </form>
  `,
  styles: [],
})
export class SignupComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  signup(form: NgForm): void {
    if (form.invalid) {
      form.form.markAllAsTouched();
      return;
    }
    console.log(form.form.value);
    form.reset();
  }
}
