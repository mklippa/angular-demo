import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-card-price',
  template: `
    <p class="card-text">
      <del *ngIf="hasDiscount">{{ price }}</del>
      {{ discountPrice | currency }}
      <span *ngIf="hasDiscount" class="badge bg-danger">
        {{ discount | percent }}
      </span>
    </p>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardPriceComponent implements OnInit {
  @Input() price!: number;
  @Input() discount!: number;

  constructor() {}

  ngOnInit(): void {}

  get hasDiscount(): boolean {
    return this.discount > 0;
  }

  get discountPrice(): number {
    return this.price * (1 - this.discount);
  }
}
