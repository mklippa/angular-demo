import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-card-rating',
  template: `
    <span class="badge rounded-circle" [ngClass]="ratingClass">
      {{ rating | number: '1.1-1' }}
    </span>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardRatingComponent implements OnInit {
  @Input() rating!: number;

  constructor() {}

  ngOnInit(): void {}

  get ratingClass(): string {
    if (this.rating >= 4) return 'bg-success';
    if (this.rating >= 3) return 'bg-warning';
    return 'bg-danger';
  }
}
