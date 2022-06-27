import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  template: `
    <nav class="nav d-flex">
      <a
        routerLink="/"
        routerLinkActive="active"
        [routerLinkActiveOptions]="{ exact: true }"
        >Home</a
      >
      <a routerLink="/catalog" routerLinkActive="active">Catalog</a>
      <app-search class="flex-fill"></app-search>

      <button
        class="btn btn-success btn-sm align-self-center me-3"
        routerLink="/signup"
      >
        <span class="bi-person-fill"></span>
      </button>
      <app-cart class="align-self-center me-3"></app-cart>
    </nav>
  `,
  styles: [
    `
      .nav {
        background-color: #333;
      }

      .nav a {
        color: #f2f2f2;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
        font-size: 17px;
        cursor: pointer;
      }

      .nav a:hover {
        background-color: #ddd;
        color: black;
      }

      .nav a.active {
        background-color: #04aa6d;
        color: white;
      }
    `,
  ],
})
export class NavigationComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
