import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { DataService } from '../services/data.service';

@Injectable()
export class CatalogService {
  constructor(private dataService: DataService<Product[]>) {}

  getProducts(filterBy: 'available' | 'withDiscount' | null = null): Product[] {
    if (filterBy === 'available')
      return this.dataService.getData().filter((p) => p.quantity > 0);
    if (filterBy === 'withDiscount')
      return this.dataService.getData().filter((p) => p.discount > 0);
    return [...this.dataService.getData()];
  }

  getProduct(id: number): Product {
    return this.dataService.getData().filter((p) => p.id === id)[0];
  }
}
