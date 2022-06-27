import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product.model';
import { CatalogService } from '../services/catalog.service';

@Component({
  selector: 'app-product',
  template: `
    <h1>Product {{ product?.id }}</h1>
    <div></div>
    <button class="btn btn-primary" (click)="onBackButtonClick()">Назад</button>
  `,
  styles: [],
})
export class ProductComponent implements OnInit {
  product?: Product;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private catalogService: CatalogService
  ) {}

  ngOnInit(): void {
    const productId = +this.route.snapshot.params['id'];
    this.product = this.catalogService.getProduct(productId);
    if (!this.product) this.router.navigate(['/not-found']);
  }

  onBackButtonClick() {
    this.router.navigate(['catalog']);
  }
}
