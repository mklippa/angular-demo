import { Component, OnInit } from '@angular/core';
import {
  fromEvent,
  Observable,
  from,
  filter,
  toArray,
  switchMap,
  delay,
  debounceTime,
  distinctUntilChanged,
  merge,
  map,
  tap,
} from 'rxjs';
import { Product } from '../models/product.model';
import { CatalogService } from '../services/catalog.service';

@Component({
  selector: 'app-search',
  template: `
    <div
      class="dropdown d-flex justify-content-center align-items-center h-100"
    >
      <div class="position-relative">
        <div class="input-group">
          <input
            class="form-control"
            type="text"
            style="width:300px"
            placeholder="Search"
            id="search"
            #search
            (blur)="showSearchResult = false"
          />
          <button
            *ngFor="let opt of searchOptions | keyvalue"
            class="btn btn-success"
            [class.active]="searchOption === opt.value"
            (click)="searchOption = opt.value; search.focus()"
            [id]="opt.key"
          >
            {{ opt.value }}
          </button>
        </div>
        <ng-container *ngIf="searchResult$ | async as searchResult">
          <ul
            class="list-group bg-white position-absolute shadow mt-1"
            style="width:300px;z-index:1"
            *ngIf="showSearchResult"
          >
            <ng-container *ngIf="searchResult.length > 0; else notFound">
              <li
                class="list-group-item"
                role="button"
                *ngFor="let result of searchResult"
              >
                {{ result.title }}
              </li>
            </ng-container>
            <ng-template #notFound>
              <li class="list-group-item">Не найдено</li>
            </ng-template>
          </ul>
        </ng-container>
      </div>
    </div>
  `,
  styles: [],
})
export class SearchComponent implements OnInit {
  searchOption = SearchOption.All;
  searchOptions = SearchOption;
  searchOptionSwitch$ = new Observable<any>();
  searchResult$!: Observable<Product[]>;
  showSearchResult = false;

  constructor(private productService: CatalogService) {}

  ngOnInit(): void {
    const searchInput = document.getElementById('search') as HTMLInputElement;
    this.searchResult$ = merge(
      fromEvent(searchInput, 'input'),
      fromEvent(searchInput, 'focus')
    ).pipe(
      filter(() => !!searchInput.value),
      map(() => ({ term: searchInput.value, option: this.searchOption })),
      debounceTime(300),
      distinctUntilChanged(
        (a, b) => a.term === b.term && a.option === b.option
      ),
      switchMap((searchTerm) => this.searchProduct(searchTerm)),
      tap(() => {
        this.showSearchResult = true;
      })
    );
  }

  searchProduct(search: {
    term: string;
    option: SearchOption;
  }): Observable<Product[]> {
    return from(this.productService.getProducts()).pipe(
      delay(1000),
      filter(
        (product) =>
          product.title.toLocaleLowerCase().indexOf(search.term) !== -1 &&
          (search.option === SearchOption.All ||
            (search.option === SearchOption.Available &&
              product.quantity > 0) ||
            (search.option === SearchOption.Discount && product.discount > 0))
      ),
      toArray(),
    );
  }
}

enum SearchOption {
  All = 'Все',
  Available = 'В наличии',
  Discount = 'Со скидкой',
}
