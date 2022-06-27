import {
  AfterContentInit,
  Component,
  ContentChild,
  OnInit,
} from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-card',
  template: `
    <div class="card h-100 position-relative">
      <ng-content select="app-card-image"></ng-content>
      <div class="position-absolute p-2">
        <ng-content select="app-card-rating"></ng-content>
      </div>
      <div class="position-absolute p-2 end-0">
        <ng-content select="app-icon"></ng-content>
      </div>
      <div class="card-body d-flex flex-column">
        <div class="flex-grow-1">
          <ng-content select="app-card-title"></ng-content>
        </div>
        <div class="mb-2">
          <ng-content select="app-card-price"></ng-content>
        </div>
        <ng-content></ng-content>
      </div>
    </div>
  `,

  styles: [],
})
export class CardComponent implements OnInit, AfterContentInit {
  @ContentChild(IconComponent) iconComponent!: IconComponent;
  private isFavorite = false;
  constructor() {}

  ngAfterContentInit(): void {
    this.iconComponent.setColor('lightgray');
    this.iconComponent.setCursor('pointer');
  }

  ngOnInit(): void {}

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
    this.iconComponent.setColor(this.isFavorite ? '#dc3545' : 'lightgray');
  }
}
