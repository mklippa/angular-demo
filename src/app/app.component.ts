import { Component } from '@angular/core';
import { Product } from './models/product.model';
import { DataService } from './services/data.service';
import { products } from './data/products.data';

@Component({
  selector: 'app-root',
  template: `
    <app-navigation class="d-block container pb-3"></app-navigation>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  title = 'my-app';
  constructor(private dataService: DataService<Product[]>) {
    this.dataService.setData(products);
  }
}
