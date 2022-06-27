import {
  AfterViewInit,
  Component,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Product } from '../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogService } from '../services/catalog.service';
import { CartService } from '../services/cart.service';
import { CardComponent } from '../card/card.component';
import { mapTo, merge, Observable } from 'rxjs';

@Component({
  selector: 'app-catalog',
  template: `
    <app-toggle
      class="d-inline-block mb-3"
      [options]="toggleOptions"
      [activeOption]="activeShowOption"
    ></app-toggle>
    <div class="row row-cols-5 gy-4 mb-3">
      <app-card *ngFor="let product of productList" class="col">
        <app-card-image [image]="product.image"></app-card-image>
        <app-card-rating [rating]="product.rating"></app-card-rating>
        <app-icon name="heart"></app-icon>
        <app-card-title
          [title]="product.title"
          (click)="openProduct(product.id)"
        ></app-card-title>
        <app-card-price
          [price]="product.price"
          [discount]="product.discount"
        ></app-card-price>
        <app-card-qty [quantity]="product.quantity"></app-card-qty>
        <app-card-button
          (btnClick)="cartService.addProduct(product)"
          [disabled]="product.quantity <= 0"
          text="Добавить в корзину"
        ></app-card-button>
      </app-card>
    </div>
  `,
  styles: [],
})
export class CatalogComponent implements OnInit, AfterViewInit {
  showOptions = ['Показать все', 'В наличии', 'Со скидкой'] as const;
  activeShowOption: typeof this.showOptions[number];
  @ViewChildren(CardComponent) components!: QueryList<CardComponent>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private catalogService: CatalogService,
    public cartService: CartService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.activeShowOption =
      this.route.snapshot.queryParams['toggle'] ?? 'Показать все';
  }

  ngAfterViewInit(): void {
    const clicks$: Array<Observable<CardComponent>> = this.components.map(
      (card) => card.iconComponent.click$.pipe(mapTo(card))
    );
    merge(...clicks$).subscribe((card) => card.toggleFavorite());
  }

  ngOnInit(): void {}

  get toggleOptions(): string[] {
    return [...this.showOptions];
  }

  get productList(): Product[] {
    switch (this.activeShowOption) {
      case 'В наличии':
        return this.catalogService.getProducts('available');
      case 'Со скидкой':
        return this.catalogService.getProducts('withDiscount');
      default:
        return this.catalogService.getProducts();
    }
  }

  openProduct(id: number): void {
    this.router.navigate(['/catalog', id]);
  }
}
