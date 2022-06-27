import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-card-image',
  template: `
    <img
      class="card-img-top p-2"
      [src]="image"
      data-bs-toggle="popover"
      data-bs-content="Top popover"
    />
  `,
  styles: [
    `
      img {
        height: 200px;
        object-fit: contain;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardImageComponent implements OnInit {
  @Input() image!: string;

  constructor() {}

  ngOnInit(): void {}
}
