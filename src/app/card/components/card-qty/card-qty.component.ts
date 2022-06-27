import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-card-qty',
  template: ` <p class="badge bg-light text-dark w-100">{{ available }}</p> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardQtyComponent implements OnInit {
  @Input() quantity!: number;

  constructor() {}

  ngOnInit(): void {}

  get available(): string {
    return this.quantity > 0 ? 'Есть в наличии' : 'Отсутствует';
  }
}
